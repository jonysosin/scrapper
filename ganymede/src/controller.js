const axios = require('axios');
const Product = require('./models/product');
const SearchOrder = require('./models/searchOrder');
const Category = require('./models/category');

const THEMISTO_BASE_URL = 'http://localhost:4000/api';
const THEMISTO_SCRAP_URL = THEMISTO_BASE_URL + '/scrap';
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ganymade');

const productSearch = async(ctx) => {
    debugger;
    let searchOrder = new SearchOrder({});
    ctx.body = searchOrder;
    
    searchOrder.save((error, searchOrder) => {
        ctx.body = searchOrder;
        if (!error) {
            const requestBody = ctx.request.body;
            axios(THEMISTO_SCRAP_URL, {
                params: {
                    queryString: requestBody.searchQuery,
                    callbackURL: 'http://localhost:3131/api/product/callback-scrapper',
                    searchOrder: searchOrder.id
                }
            }).then((response) => {
                if (response.data.status === SearchOrder.STATUS_PROCESSING) {
                    searchOrder.status = SearchOrder.STATUS_PROCESSING;
                    searchOrder.save();
                }
            }).catch( (error) => {
                searchOrder.status = SearchOrder.STATUS_FAILED;
                searchOrder.save();
            } );
        }
    });
};

const productSearchByID = async(ctx, id) => {
    let response = {};
    response.searchOrder = await SearchOrder.findById(id, (error, searchOrder) => {
        return searchOrder;
    });

    if (response.searchOrder.status === SearchOrder.STATUS_PROCESSED) {
        const products = await Product.find({'searchOrderID': id}, (error, products) => {
            return Product.prepareProducts(products);
        });
        response.products = products;
    }

    ctx.body = response;
};

const productOrderList = async(ctx) => {
    let responseDataCollection = [];
    let responseData = {};
    
    await SearchOrder.find({}, (error, searchOrders) => {
        for (let searchOrder of searchOrders) {
            responseData = {}
            responseData.status = searchOrder.status;
            responseData.updated = searchOrder.updated;
            responseData.id = searchOrder._id;
            responseDataCollection.push(responseData);
        }

        ctx.body = responseDataCollection;
    });
};

const productCategoryID = async(ctx, id) => {
    let responseData = {};
    const products = await Product.find({category: id}, (error, products) => {
        return Product.prepareProducts(products);
    });
    if (products) {
        responseData = products;
    } else {
        responseData = {status: "Error", description: "There was an error"};
    }

    ctx.body = responseData;
};

const callbackScrapper = async(ctx) => {
    const searchOrderID = ctx.request.body.searchOrder;
    if (searchOrderID) {
        SearchOrder.findById(searchOrderID, (error, searchOrder) => {
            searchOrder.status = 'processed';
            searchOrder.save();
        }); 
    }
    if (ctx.request.body.products) {
        let productObject;

        for (let product of ctx.request.body.products) {
            let title = product.category;
            const x = await Category.findOne({title}, (error, categoryModel) => {
                if (!categoryModel) {
                    categoryModel = new Category({title});
                    categoryModel.save();
                }

                productObject = new Product({
                    title: product.title,
                    sku: product.sku,
                    regularPrice: product.regularPrice,
                    promoPrice: product.promoPrice,
                    productCategory: product.category, //change
                    description: product.description,
                    images: product.images,
                    category: categoryModel.id,
                    searchOrderID
                });

                productObject.save();
            });
        }  
    }
};

module.exports = {
    productSearch,
    productSearchByID,
    productOrderList,
    productCategoryID,
    callbackScrapper
};
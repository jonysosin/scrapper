let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
    title: String,
    sku: String,
    regularPrice: String,
    promoPrince: String,
    productCategory: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    description: String,
    images: Array,
    searchOrderID: String
});

let Product = mongoose.model('Product', ProductSchema);

Product.prepareProducts = (products) => {
    let response = [];
    if (Array.isArray(products)) {
        for (let product of products) {
            response.push(Product.prepareProduct(product));
        }
    }

    return response ;
};

Product.prepareProduct = (product) => {
    let response = {};
    if (product) {
        response.images = product.images;
        response.id = product.id;
        response.title = product.title;
        response.sku = product.sku;
        response.regularPrice = product.regularPrice;
        response.promoPrice = product.promoPrice;
        response.categoryName = product.productCategory;
        response.category = product.category;
        response.description = product.description;
        response.searchOrderID = product.searchOrderID;
    }

    return response;
};

Product.prototype.jonathan = () => {
    debugger;
};

module.exports = Product;
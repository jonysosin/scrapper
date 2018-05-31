const puppeteer = require('puppeteer');

const Scrapper = {
    url: 'https://www.easy.com.ar',
    inputSelector: '#CatalogSearchForm input.header-userbar-input',
    searchButton: '#WC_CachedHeaderDisplay_button_1',
    browserPage: null,
    queryString: '',
    browser: null,
    
    async createPage(queryString) { 
        this.browser = await puppeteer.launch({devtools: true});
        // this.browser = await puppeteer.launch();
        this.browserPage = await this.browser.newPage();
        this.queryString = queryString;
        
        await this.browserPage.goto(this.url, { waitUntil: 'networkidle2', timeout: 0 });
        await this.browserPage.type(this.inputSelector, this.queryString);
        await this.browserPage.evaluate( () => {
            document.querySelector("[name='pageSize']").value = 1200;
        });
        await this.browserPage.click(this.searchButton);
        await this.browserPage.waitFor('.thumb-product .thumb-name');
        await this.browserPage.waitFor(1000);
        
        console.log('Visiting "' + queryString + '" result page.');

        return this.browserPage;
    },

    getProductsFromList(page) {
        return page.evaluate(() => {
            let result = [];
            let qtyProducts = parseFloat( document.querySelector('.search-results').innerText );
            let shouldLoadMoreProducts = true;
            
            const productsDOM = document.querySelectorAll('.thumb-product');
            console.log(productsDOM.length + ' products.');
            for (let productDOM of productsDOM) {
                result.push({
                    title: productDOM.querySelector('.thumb-name').innerText.trim(),
                    productLink: productDOM.querySelector('a').href,
                });
            }
        
            return result;
        });
    },

    async fillProductsData(products) {
        let productsDataFilled = [];
        for (let product of products) {
            await this.browserPage.goto(product.productLink, { waitUntil: 'networkidle2', timeout: 0 });
            product.searchTerm = this.queryString;
            product = await this.getProductData(product);
            productsDataFilled.push(product);
        }

        console.log('Ending');
        return productsDataFilled;
    },

    async getProductData(product) {
        let productData = await this.browserPage.evaluate(() => {
            let product = {};
            product.title = document.querySelector('#product-right > div.product-description > div.prod-title').innerText.trim();
            product.sku = document.querySelector('#product-right > div.product-description > span:nth-child(4)').innerText.trim();
            product.description = document.querySelector('.tabs-inner').innerText;

            const promoPriceDOM = document.querySelector('.prod-price #tarj-mas-edit');
            if (promoPriceDOM) {
                product.promoPrice = promoPriceDOM.innerText.trim();
                product.regularPrice = document.querySelector('.price-e.conpromo').innerText.trim();
            } else {
                const regularPriceDOM = document.querySelector('#product-right > div.product-description > div.prod-price-container > div.prod-price > span.price-e');
                
                if (regularPriceDOM) {
                    product.regularPrice = regularPriceDOM.innerText.trim();
                }
            }
            
            let categoryName = "";
            for (let breadcrumb of document.querySelectorAll('#breadcrumb a')) {
                if (breadcrumb.innerText !== 'Inicio|'){
                    categoryName += breadcrumb.innerText.replace('|', ' | ');
                }
            }
            product.category = categoryName;

            let images = [];
            for (img of document.querySelectorAll('div.s7thumb')) {
                images.push(img.style.backgroundImage.replace('url(','').replace(')',''));
            }
            product.images = images;

            return product;
        });

        return productData;
    },
    
    process(queryString, successCallback) {
        this.createPage(queryString)
        .then((page) => {
            this.getProductsFromList(page)
            .then((products) => {
                this.fillProductsData(products)
                .then((data) => {
                    this.browser.close();
                    successCallback(data);
                });
            });
        })
        .catch((error) => {
            console.log('ERROR APPLICATION - ' + error);
        });
    }
};

module.exports = Scrapper;
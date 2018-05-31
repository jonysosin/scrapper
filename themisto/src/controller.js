const Scrapper = require('./scrapper');
const axios = require('axios');
const config = require('config');

module.exports.scrap = async(ctx) => {
    ctx.body = {status: 'processing'};
    Scrapper.process(ctx.query.queryString, (products) => {
        axios({
            method:'post',
            url: ctx.query.callbackURL,
            data: {products, searchOrder: ctx.query.searchOrder},
            auth: {
                username: config.Credentials.username,
                password: config.Credentials.password
            }
        });
    });
};
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SearchOrderSchema = new Schema({
    status: { type: String, default: 'received' },
    updated: { type: Date, default: Date.now }
});

let SearchOrder = mongoose.model('SearchOrder', SearchOrderSchema);
SearchOrder.STATUS_PROCESSED = 'processed';
SearchOrder.STATUS_PROCESSING = 'processing';
SearchOrder.STATUS_FAILED = 'failed';

module.exports = SearchOrder;
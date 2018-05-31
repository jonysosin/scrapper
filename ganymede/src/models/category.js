let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CategorySchema = new Schema({
    title: String
});

module.exports = mongoose.model('Category', CategorySchema);
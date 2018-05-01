var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var product = new Schema({
    name: String,
    price: Number,
    currency: String
})

module.exports = mongoose.model("Products", product);


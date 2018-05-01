var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var invoice = new Schema({
    date: Date,
    invoice_number: String,
    products:[
        {
            name: String,
            quantity: Number,
            unity_price: Number,
            price: Number,
            tax: Number,
            total_price: Number
        }
    ],
    total_value: Number

})

module.exports = mongoose.model("Invoice", invoice);


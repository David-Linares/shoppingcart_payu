/**
 * Created by USER on 14/04/2017.
 */

var InvoiceModel = require('../models/invoice');

exports.createInvoice = function (req, res) {

    var newInvoiceData = req.body;
    var productsInvoice = [];
    var total_value = 0;
    for (prod in newInvoiceData.products){
        var nProdInvoice ={
            name: newInvoiceData.products[prod].name,
            quantity: newInvoiceData.products[prod].quantity,
            unity_price: Math.round(newInvoiceData.products[prod].value),
            price: Math.round((newInvoiceData.products[prod].value * newInvoiceData.products[prod].quantity) - ((newInvoiceData.products[prod].value * newInvoiceData.products[prod].quantity) * 0.19)),
            tax: Math.round((newInvoiceData.products[prod].value * newInvoiceData.products[prod].quantity) * 0.19),
            total_price: Math.round(newInvoiceData.products[prod].value * newInvoiceData.products[prod].quantity)
        }
        productsInvoice.push(nProdInvoice);
        total_value += nProdInvoice.total_price;
    }
    InvoiceModel.findOne().sort({date:-1}).exec(function(err, lastInvoice){
        if(!lastInvoice){
            number_invoice = "10000001";
        }else{
            number_invoice = parseInt(lastInvoice.invoice_number) + 1;
        }
        var newInvoice = new InvoiceModel({
            date: new Date(),
            invoice_number: number_invoice,
            products:productsInvoice,
            total_value: total_value
        })
        newInvoice.save(function (err) {
            if (!err){
                console.log("Factura Guardada correctamente!!");
                res.send({'msg': "Producto Guardado correctamente", 'obj': newInvoice})
            }else {
                console.log("Error Guardando Factura: " + err);
            }
        })

    });

};


exports.getInvoices = function(req, res){
    InvoiceModel.find(function(err, invoicesList){
        if(!err){
            res.send(invoicesList);
        }else{
            console.log("Error Consultando productos: "+err);
        }
    });
};
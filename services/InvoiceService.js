/**
 * Created by USER on 13/04/2017.
 */



var invoices = [];


module.exports.createInvoice = function (req, res) {
    var data =  req.body.products;
    invoices.push(data);
    console.log("Body ");
    console.log(req.body);
    console.log("Invoices");
    console.log(invoices);



    //TODO send the data of the invoice as answer
       // res.status(200).jsonp(data);
    console.log("Using service");
    res.status(200).jsonp("answer");

};

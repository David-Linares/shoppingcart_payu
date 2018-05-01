/**
 * Created by USER on 13/04/2017.
 */
/**
 * This Controller handles all the requests made to the app and routes them to their specific service
 */


"use strict";

var InvoicesController = require('./InvoicesController');
var ProductsController = require('./ProductsController');

/**
 *Handle all the API requests 
 * @param app
 */
function Controllers(app){


    //TODO
    app.get('/api/invoice', InvoicesController.getInvoices);
    app.post('/api/invoice', InvoicesController.createInvoice);
    app.get('/api/products', ProductsController.getProducts);
    app.post('/api/products', ProductsController.addProduct);


}

module.exports   =  Controllers;
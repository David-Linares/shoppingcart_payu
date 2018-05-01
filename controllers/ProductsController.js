var ProductsModel = require('../models/products');

exports.getProducts = function(req, res){
    ProductsModel.find(function(err, productsList){
        if(!err){
            res.send(productsList);
        }else{
            console.log("Error Consultando productos: "+err);
        }
    });
};

exports.addProduct = function(req, res){
    var newProductData = req.body;
    var newProduct = new ProductsModel({
        name: newProductData.name,
        price: newProductData.price,
        currency: newProductData.currency
    })
    newProduct.save(function (err) {
        if (!err) console.log("Producto Guardado correctamente!!");
        else console.log("Error Guardando producto: "+err);
    })

    res.send({msg: "Producto Guardado correctamente", obj: ProductsModel})
};

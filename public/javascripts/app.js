/**
 * Created by USER
 */


(function(){

    var myApp =  angular.module("GeekStore", ['ngCookies']);
    myApp.constant('URL_CURRENCY', "http://data.fixer.io/api/latest?access_key=a557ee3da4798da2a9303bfa382bae64&symbols=USD,COP,MXN")

    //controllers

    myApp.controller("ProductsController" , ProductsController);

    ProductsController.$inject = ['$scope', '$http', '$cookies', '$window', 'URL_CURRENCY'];
    function ProductsController($scope, $http, $cookies, $window, URL_CURRENCY) {
        $scope.products = [];
        var URL = "/api/matrix";
        $scope.product = "";
        $scope.quantity = 0;
        $scope.value = 0;

        $scope.message = "Usted no ha realizado ninguna compra aún";
        $scope.addProduct =  function(product_select){
            if (product_select.currency !== "COP"){
                var currency_value = $cookies.get("currency_values");
                if(!currency_value){
                    $http.get(URL_CURRENCY).success(function(data, status, headers, config) {
                        if (data.success == true){
                            console.log("SET the currency");
                            var expiresDate = new Date();
                            expiresDate.setHours(expiresDate.getHours() + 1);
                            $cookies.put("currency_values", JSON.stringify(data), {'expires':expiresDate})
                            product_select.price = (data.rates.COP / data.rates[product_select.currency]) * product_select.price;
                            $scope.products.push({name: product_select.name, quantity: $scope.quantity, value: product_select.price });
                        }
                    }).
                    error(function(data, status, headers, config) {
                        console.log("Error " + data + " " + status);
                        $scope.message = "There was an error creating the matrix";
                    });
                }else{
                    currency_value = JSON.parse(currency_value);
                    product_select.price = (currency_value.rates.COP / currency_value.rates[product_select.currency]) * product_select.price;
                    $scope.products.push({name: product_select.name, quantity: $scope.quantity, value: product_select.price });
                }
            }else{
                $scope.products.push({name: $scope.product.name, quantity: $scope.quantity , value: $scope.product.price });
            }
            $scope.product = "";
            $scope.quantity = 0;
            $scope.value = 0;

        };

        $scope.removeProduct =  function(productName){
            for(var i = 0 ;  i < $scope.products.length; i++){
                if(  $scope.products[i].name == productName){
                    $scope.products.splice(i, 1);
                }
            }
        };

        $scope.getProducts =  function(){
            //TODO
            var URL = "/api/products";

            $http.get(URL).success(function(data, status, headers, config) {
                $scope.productsList = data;
            }).
            error(function(data, status, headers, config) {
                console.log("Error " + data + " " + status);
                $scope.message = "There was an error creating the matrix";
            });


        };

        $scope.detailInvoice = function(invoice){
            $scope.invoice = invoice;
        }

        $scope.getInvoices =  function(){
            //TODO
            var URL = "/api/invoice";

            $http.get(URL).success(function(data, status, headers, config) {
                $scope.invoicesList = data;
            }).
            error(function(data, status, headers, config) {
                console.log("Error " + data + " " + status);
                $scope.message = "There was an error creating the matrix";
            });

        };

        $scope.buyProducts =  function(){
            //TODO
            var URL = "/api/invoice";
            var jsondata =  {products: $scope.products};
            console.log(jsondata);

            $http.post(URL, jsondata).
            success(function(data, status, headers, config) {
                $scope.products = [];
                $scope.invoice = data.obj;
                $scope.getInvoices();
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                console.log("Error " + data + " " + status);
                $scope.message = "There was an error creating the matrix";
            });


        };

        $scope.print_invoice = function(){

            var invoice = document.getElementById("factura_emitida").innerHTML;
            var myWindow = $window.open('', '', 'width=800, height=600');
            myWindow.document.write(invoice);
            myWindow.print();
            myWindow.close();

        }

        $scope.getProducts();
        $scope.getInvoices();
    }

})();
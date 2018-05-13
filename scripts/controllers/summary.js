'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:SummaryCtrl
 * @description
 * # SummaryCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('SummaryCtrl', function ($scope,summary,$window) {
     if(localStorage.getItem("isLogin") === null || JSON.parse(localStorage.getItem("isLogin"))==false){
     $window.location.href = "#login";
    }
         if(localStorage.token){

          var token = summary.gettoken();

            var promise =   summary.cartdataserver(token);
            promise.then(function(data){
            console.log(data);
            $scope.billdataserver = data;
        },function(err){
            console.log("error loading cart items");
    } )  
//     ordersummary();
//      }
//     function ordersummary(){
       var mobilenumber = localStorage.getItem("mobilenumber");
                  
                    var token = summary.gettoken();
                    var promise = summary.bill(token)
                          promise.then(function(data){
                    console.log(data);
                    var totalwithex = 0;
                    // JSON.parse(localStorage.getItem("amount"))+parseInt(data.data.DeliveryCharges)+ JSON.parse(localStorage.getItem("tax"))- JSON.parse(data.hcash).toPrecision(2);
                    var hcash= JSON.parse(data.hcash).toFixed(2);
                    localStorage.setItem('hcash',hcash);
                    localStorage.setItem('totalamount',totalwithex);
                  var value_amt = parseFloat(totalwithex);
                  value_amt = value_amt.toFixed(2);   
                  localStorage.setItem("totalamount",data.data.TotalWithExtras);       
                  $scope.cost = {
                  Total:data.data.Total,
                  DeliveryCharges:data.data.EstimatedDeliveryCharges,
                  Taxes:data.data.Taxes,
                  TotalWithExtras:(data.data.TotalWithExtras - data.hcash).toFixed(2),
            }

               $scope.cost1 = {

                xcash:localStorage.getItem("hcash") 
            } 
      },function(err){
  
    } );
       
  }


  
  $scope.payment = ()=>{
    if(localStorage.getItem("amount") !=null && localStorage.getItem("amount")>0 && $scope.cost.Total != undefined){
       var doPayment= true;
       localStorage.setItem('doPayment',doPayment);
      $window.location.assign('#payment');
    }
    else{
      $window.location.href= "#stores";
    }
  }
  });

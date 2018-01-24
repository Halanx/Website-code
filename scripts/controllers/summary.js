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
//     ordersummary();
//      }
//     function ordersummary(){
       var mobilenumber = localStorage.getItem("mobilenumber");
                  
                    var token = summary.gettoken();
                    var promise = summary.bill(token)
                          promise.then(function(data){
                    console.log(data);
                    var totalwithex = JSON.parse(localStorage.getItem("amount"))+parseInt(data.data.DeliveryCharges)+ JSON.parse(localStorage.getItem("tax"))- JSON.parse(data.hcash).toPrecision(2);
                    var hcash= JSON.parse(data.hcash).toFixed(2);
                    localStorage.setItem('hcash',hcash);
                    localStorage.setItem('totalamount',totalwithex);
                  
                  $scope.cost = {
                  Total:localStorage.getItem("amount"),
                  DeliveryCharges:data.data.DeliveryCharges,
                  Taxes:localStorage.getItem("tax"),
                  TotalWithExtras:totalwithex,
                    
                   
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
      $window.location.href = "/payment.php";
    }
    else{
      $window.location.href= "#landing";
    }
  }
  });

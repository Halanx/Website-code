'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:PaymentCtrl
 * @description
 * # PaymentCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('PaymentCtrl', function ($scope,payment,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var totalAmount = 0;
    function getAmount(){
      var key = localStorage.getItem("token");
      var promise = payment.bill(key);
      promise.then((data)=>{
         totalAmount = data.data.TotalWithExtras;
         makeObj();
      },(err)=>{
        console.log(err);
      })
    }
    getAmount();
    var token = localStorage.getItem("token");
    var obj = {};
    var hashObj = {};
    var d = new Date();
    $scope.payment1 = ()=>{
      console.log("hey");
    }
    // $scope.callMe();

   $scope.payonline = ()=>{
     console.log('online');
   }

   function createHash(){
    hashObj.amount = parseFloat(totalAmount).toFixed(2);
     payment.createHash(hashObj,token).then((data)=>{
       console.log(data);
       $scope.hashData = data;
       $scope.hashData.amount = parseFloat($scope.hashData.amount);
       if(!($scope.hashData.amount.toString().includes("."))){
         $scope.hashData.amount = $scope.hashData.amount.toFixed(1);
       }
       $scope.hashData.phone = parseInt($scope.hashData.phone);
       $scope.hashData.surl = "https://www.halanx.com/vTransactionEvent?token="+token+"&isASAP="+obj.isASAP+"&address="+obj.addressDetails+"&deliverydate="+obj.date+"&starttime="+obj.starttime+"&lat="+obj.latitude+"&long="+obj.longitude;
     },(err)=>{
       console.log(err);
     })
   }

   
     

   function makeObj(){
     createHash();
     obj.AsSoonAsPossible = localStorage.getItem("AsSoonAsPossible") || false;
     obj.DeliveryAddress = localStorage.getItem("address");
     obj.DeliveryDate = localStorage.getItem("DeliveryDate");
     obj.StartTime = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
     obj.EndTime = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
     obj.Notes = null;
     var direction = JSON.parse(localStorage.getItem("obj"));
     obj.Latitude = direction.Latitude;
     obj.Longitude = direction.Longitude;
     obj.TransactionID = $scope.hashData.txnid;
     obj.Total = parseFloat(totalAmount).toFixed(2);
     obj.CashOnDelivery = true;
     
   }

   

   $scope.cod = ()=>{
     
     var promise = payment.cod(obj,token);
     promise.then((data)=>{
       if(data.msg == "Successfully ordered!"){
          $window.location.assign("#landing");
          localStorage.removeItem("storedata");

       }
     })

   }
  });

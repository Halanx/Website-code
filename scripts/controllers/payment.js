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
    var  deliveryadd = "";
    var totalAmount = 0;
    $scope.hashData = {};
    function getAmount(){
       deliveryadd = localStorage.getItem("Address");
      var key = localStorage.getItem("token");
      var promise = payment.bill(key);
      promise.then((data)=>{
         totalAmount = data.data.TotalWithExtras - data.hcash.toFixed(2);
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
       console.log(obj.DeliveryAddress);
       $scope.hashData.phone = parseInt($scope.hashData.phone);
       $scope.hashData.surl = "https://www.halanx.com/vTransactionEvent?token="+token+"&isASAP="+obj.AsSoonAsPossible+"&address="+obj.DeliveryAddress+"&deliverydate="+obj.DeliveryDate+"&starttime="+obj.StartTime+"&lat="+obj.Latitude+"&long="+obj.Longitude;
     },(err)=>{
       console.log(err);
     })
   }

$scope.complete = false;
   
     

   function makeObj(){
     
     obj.AsSoonAsPossible = localStorage.getItem("AsSoonAsPossible") || false;
     obj.DeliveryAddress = deliveryadd;
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
     createHash();
    //  
     console.log($scope.hashData);
   }

   
   $scope.lodRip = true;

   $scope.cod = ()=>{

    $scope.lodRip = false;
     
     var promise = payment.cod(obj,token);
     promise.then((data)=>{
       if(data.msg == "Successfully ordered!"){
         $scope.complete = true;
         $scope.lodRip = false;
          setTimeout(function(){
			      $window.location.assign("#landing");
            localStorage.removeItem("storedata");
		      },1200);
          

       }
     })

   }
  });

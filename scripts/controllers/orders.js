'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:OrdersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('OrdersCtrl', function ($scope,orders,$window) {
      $scope.loader = true;
       if(localStorage.getItem("isLogin") === null || JSON.parse(localStorage.getItem("isLogin"))==false){
     $window.location.href = "#login";
    }
    if(localStorage.getItem("storedata")!=null){
            var counter_length = JSON.parse(localStorage.getItem("storedata")).length;
            $scope.counter = counter_length
        }
        else{
            $scope.counter = 0;
        }
    $scope.past = true;
    $scope.check1;
    $scope.showCancel = false;
    $scope.trackMe = false;
    // $scope.cancel_order = true;    
    $scope.rev = true;
    $scope.menu = false;
    $scope.movex = true;
    $scope.cancelMsg = "Are you sure, you want to cancel the order?";
    $scope.order_id;
    $scope.addsidebar = ()=>{
        $scope.movex = !$scope.movex;
    }

    $scope.closeTrack = ()=> {
        $scope.trackToggle = false;
    }

    $scope.trackToggle = false;
    $scope.toggleDeliver = true;
    $scope.toggleOnGo = true;
    $scope.toggleRec = true;

    $scope.trackyourOrder = (order)=>{
        $scope.loader = false;
        $scope.trackToggle = true;
        $scope.toggleDeliver = true;
        $scope.toggleOnGo = true;
        $scope.toggleRec = true;
        let orderId = order.id;
        let token = orders.gettoken();
        $scope.trackOrder = "";

       var promise =  orders.trackOrder(token,orderId);
                     
            promise.then(function(data){
                console.log("mere func k andr");
        console.log(data);

        if(data=="") {
            $scope.toggleRec = false;
            $scope.trackStatus = "Order Recieved";
            $scope.loader = true;
        } else {
            if(data[0].IsDelivered==false) {
                console.log("delivered");
                $scope.trackStatus = "On Going";
                if(data[0].ShopperId){
                $scope.delby = ((data[0].ShopperId).user).first_name +" "+ ((data[0].ShopperId).user).last_name;
                $scope.shopperMo = (data[0].ShopperId).PhoneNo;
                $scope.estimate = data[0].ETA;
                }
                $scope.orderItems = data[0].items;
                
                $scope.toggleOnGo = false;
                $scope.loader = true;
            }else if(data[0].IsDelivered==true) {
                console.log("ongoing");
                $scope.trackStatus = "Order Delivered";
                $scope.toggleDeliver = false;
                $scope.loader = true;
            }
        }
      },function(err){
  
    } ); 

}  
$scope.$on('$viewContentLoaded', function(){
    $scope.myorder("ongoing");
  });
    
    $scope.myorder = (check)=>{
        if(localStorage.token){
            let token = orders.gettoken();
       
        var promise = orders.getorderon(token);
        
        if(check=="ongoing"){
            
             var filterdata = [];
             var k=0;
            promise.then(function(data){
        console.log(data);
                for(var i=0;i<data.length;i++){
                     for(var j=0;j<data[i].order_items.length;j++){
                        //  data[i].Total = data[i].Total.toFixed(2);
                          if(data[i].order_items[j].IsDelivered==false && data[i].IsCancelled == false){
                              
                            //   console.log(data[i]);
                              filterdata[k] = data[i];
                              k++;
                              break;
                                }  
                                    }
                                         }
            //  var filterdata = data.filter((obj)=>{
            //                 return obj.IsDelivered == true;
            //                 });
             console.log(filterdata)
        $scope.orders = filterdata;
        $scope.trackMe = false;
            $scope.past = false;
            $scope.noongo=false;
        if(filterdata=="") {
            $scope.noongo=true;
            $scope.orderStat = "You have no ongoing orders. Please order."
        }
      },function(err){
  
    } ); 
        }
        else if(check=="delivered"){
             $scope.noongo=false;
             var filterdata1 = [];
             var m=0;
            
            promise.then(function(data){
        console.log(data);
        for(var i=0;i<data.length;i++){
                     for(var j=0;j<data[i].order_items.length;j++){
                        //  data[i].Total = data[i].Total.toFixed(2);
                          if(data[i].order_items[j].IsDelivered==true || data[i].IsCancelled==true){
                            //   console.log(data[i]);
                              if(data[i].IsDelivered == true){
                                  data[i].order_status = "Delivered";
                              }
                              else if(data[i].IsCancelled == true){
                                  data[i].order_status = "Cancelled";
                              }
                              filterdata1[m] = data[i];
                              m++;
                              break;
                                }  
                                    }
                                         }
            //  var filterdata = data.filter((obj)=>{
            //                 return obj.IsDelivered == false;
            //                 });
             console.log(filterdata1)
        $scope.orders = filterdata1;
        $scope.trackMe = true;
             $scope.past = true;
              
        if(filterdata1=="") {
        $scope.noongo=true;
        $scope.orderStat = "You have no delivered orders."
    }
      },function(err){
  
    } );
    
    
        }
        else{
               promise.then(function(data){
        console.log(data);
             var filterdata = data.filter((obj)=>{
                            return obj.IsDelivered == false;
                            });
             console.log(filterdata)
        $scope.orders = filterdata;
      },function(err){
  
    } )  
    if(filterdata=="") {
        $scope.noongo=true;
        $scope.orderStat = "You have no delivered orders."
    }
        }
        
    }
    }
    //  $scope.myorder();
     $scope.openCancel = (id)=>{
         if($scope.check1!=id){
         $scope.check1 = id;
        }
        else{
            $scope.check1 = "0000000";
        }
        //  console.log($scope.cancel_order);
        //  $scope.cancel_order = !$scope.cancel_order;
     }

     $scope.cancelOrder = (id)=>{
        $scope.order_id = id; 
        $scope.cancelMsg = "Are you sure, you want to cancel the order?";
        $scope.showCancel = false;   
     }

     $scope.confirmDeletion = ()=>{
         $scope.showCancel = true;
         let token = orders.gettoken();
         console.log("token ",token);
         orders.cancelOrder(token,$scope.order_id).then((data)=>{
             $scope.showCancel = true;
            
           if(data.data.result == "Order cancelled successfully!"){
                $scope.cancelMsg = "Order cancelled successfully!";
                $scope.myorder("ongoing");
            }
            else{
                $scope.cancelMsg = "Sorry, Our shopper is out on the delivery of your order, so can't be cancelled now.";
            }
         },(err)=>{
             $scope.showCancel = true;
             $scope.cancelMsg = "Sorry, Our shopper is out on the delivery of your order, so can't be cancelled now.";
         });
     }
  });

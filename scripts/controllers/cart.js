'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('CartCtrl', function ($scope,cart, $window) {
     if((localStorage.getItem("isLogin") === null || JSON.parse(localStorage.getItem("isLogin"))==false)&&(localStorage.getItem("isLocated")==null || localStorage.getItem("isLocated")==false)){
     $window.location.href = "#login";
    }
    $scope.totalamount=0;
     autoload();
    userid();
    
    $scope.movex = true;
    $scope.checkFav = true;
        $scope.addsidebar = ()=>{
            $scope.movex = !$scope.movex;
        }
   $scope.$watch(function(){return $scope.totalamount}, function (newValue, oldValue) {
         
           if(newValue != oldValue){
               $scope.totalamount   = cart.calculatetotal($scope.cartproductlist);
                $scope.totaltax = cart.calculatetax($scope.cartproductlist);
                localStorage.setItem("amount",$scope.totalamount);
                localStorage.setItem("tax",$scope.totaltax);

            }
          
        }, true); 
    
    function autoload()
 {

        var token = cart.gettoken();
        if(token!=undefined){
            var promise =   cart.load(token);
            promise.then(function(data){
            console.log(data);
            $scope.cartproductlist = data;
            $scope.totalamount   = cart.calculatetotal($scope.cartproductlist);
            if(data.length == 0) {
                $scope.cartclass = true;
                $scope.emptyclass = false; 
            } else {
                $scope.cartclass = false;
                $scope.emptyclass = true; 
            }
        },function(err){
            console.log("error loading cart items");
    } );
        }
        else{
            $scope.cartproductlist = [];
                var Item = {};
                if(localStorage.getItem("storedata")==null || localStorage.getItem("storedata")==undefined) {
                    localStorage.setItem("storedata", "[]");
                }
            JSON.parse(localStorage.getItem("storedata")).forEach(function(element) {
                if(element.Item == null) {
                    Item = {
                        "Item": element,
                        "Quantity" : element.quantity
                    }
                    $scope.cartproductlist.push(Item);
                } else {
                    $scope.cartproductlist.push(element);
                }
            }, this);
            var json = JSON.stringify($scope.cartproductlist);
          localStorage.setItem('storedata',json);
            console.log($scope.cartproductlist);
            if($scope.cartproductlist.length == 0) {
                $scope.cartclass = true;
                $scope.emptyclass = false; 
            } else {
                $scope.cartclass = false;
                $scope.emptyclass = true; 
            }
    //        if($scope.cartproductlist.Item.length==0){
    //       $scope.cartclass = true;
    //       $scope.emptyclass = false;    
    // }
    //  else{
    //      console.log($scope.cartproductlist);
    //       $scope.emptyclass = true;
    //  $scope.cartclass = false;
    // }
    if($scope.cartproductlist.length!=0) {
        $scope.totalamount   = cart.calculatetotallocal($scope.cartproductlist);
    }
        }  
    //  $scope.cartproductlist = cart.load();
    //  if($scope.cartproductlist!=null){
    //  console.log($scope.cartproductlist)
    
    // $scope.totaltax = cart.calculatetax($scope.cartproductlist);
    //  localStorage.setItem("amount",$scope.totalamount);
    //  localStorage.setItem("tax",$scope.totaltax);
    // if($scope.cartproductlist.length==0){
    //       $scope.cartclass = true;
    //       $scope.emptyclass = false;    
    // }
    //  else{
    //       $scope.emptyclass = true;
    //  $scope.cartclass = false;
    // }
    //  }
    //  else{
    //       $scope.emptyclass = false;
    //       $scope.cartclass = true;
    // }
 }
    function userid(){
        if(localStorage.token){
            var token = cart.gettoken();
            console.log(token);
          var promise =   cart.userid(token);
                  promise.then(function(data){
        console.log(data.data.id);
        cart.saveid(data.data.id);
        
 
      },function(err){
        // alert("err");   
    } )  
            
        }
    }

    $scope.deleteproduct = (list, index)=>{
    //      console.log(list);
    //    list.Active = false;
    //     console.log(list);
    //  var finalarr =    cart.filterfunction($scope.cartproductlist)
    //  $scope.cartproductlist = finalarr;
    //     $scope.totalamount = cart.calculatetotal($scope.cartproductlist);
    //      var json = JSON.stringify($scope.cartproductlist);
    //       localStorage.setItem('storedata',json);
    //       console.log(localStorage);
    //       cart.load();
    //     var len = cart.cartlength($scope.cartproductlist);
    //      var json = JSON.stringify(len);
    //       localStorage.setItem('counter',json);
    console.log(list);

    var token = cart.gettoken();
    console.log("token is",token);
    if(token){
    $scope.cartproductlist.splice(index, 1);
    localStorage.setItem("counter", parseInt(localStorage.getItem("counter"))-1);

        var promise = cart.deleteproductserver(list, token);
        promise.then(function(data){
            console.log("deleted from server");
            if(data.length==0){
                    $scope.emptyclass = false;
                $scope.cartclass = true;
            }
            else{
                    $scope.emptyclass = true;
                    $scope.cartclass = false;
                    $scope.totalamount=0;
            }
        },function(err){
            console.log("error while deleting from server"); 
        } );

    }
    else{
         $scope.cartproductlist.splice(index, 1);
        var storedata = JSON.parse(localStorage.getItem("storedata"));
        storedata.splice(index, 1);
        localStorage.setItem("storedata",JSON.stringify(storedata));
$scope.totalamount   = cart.calculatetotallocal($scope.cartproductlist);
        // $scope.totalamount=cart.calculatetotallocal(JSON.parse(localStorage.getItem("storedata")));
    }
    // console.log($scope.cartproductlist);
        
    }
    
   $scope.updateminus= (list)=>{
    list.Quantity--;
     
    list.Item.quantity--;
       
       $scope.totalamount=cart.calculatetotal($scope.cartproductlist);
        var json = JSON.stringify($scope.cartproductlist);
          localStorage.setItem('storedata',json);
          var token = cart.gettoken();

          var promise = cart.updateproductonserver(list, token);
           promise.then(function(data){
               console.log("updated on server");
           
           },function(err){
               console.log("error while updating on server"); 
           } );
   }
   $scope.updateplus = (list)=>{
     
       
       list.Quantity++;
       list.Item.quantity++;
      
    $scope.totalamount   = cart.calculatetotal($scope.cartproductlist);
     var json = JSON.stringify($scope.cartproductlist);
          localStorage.setItem('storedata',json);
          var token = cart.gettoken();

           var promise = cart.updateproductonserver(list, token);
            promise.then(function(data){
                console.log("updated on server");
            
            },function(err){
                console.log("error while updating on server"); 
            } );
   }

   $scope.submitcart = ()=>{
       

if(localStorage.token=="null"|| localStorage.token==null){
    $window.location.href = "#login";
}
       else{
           var token = cart.gettoken();
           var userid = cart.loadid();
           var i;
                  for( i=0;i<$scope.cartproductlist.length;i++){
           var obj = {};
//           obj.CartPhoneNo=mobilenumber;
                      obj.Cart = userid;
                      obj.Notes = "";
           obj.Item = $scope.cartproductlist[i].Item.id;
          obj.Quantity =$scope.cartproductlist[i].Quantity ;
      var promise = cart.callserver(obj,token);
          
       promise.then(function(data){
        console.log(data);
                         if(i==$scope.cartproductlist.length){
                        //   alert("Your Order is Ready!");
            $window.location.reload();             
            $window.location.assign("#datepicker"); 
                          
                     
           }

    },
                 function(err){
        // alert("err");
        
    })
       }  
//         if(i==$scope.cartproductlist.length){
//           alert("loopover")
//           }  
       }
       
       
   }
  });

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
     
     $scope.cartproductlist = cart.load();
     if($scope.cartproductlist!=null){
     console.log($scope.cartproductlist)
    $scope.totalamount   = cart.calculatetotal($scope.cartproductlist);
    $scope.totaltax = cart.calculatetax($scope.cartproductlist);
     localStorage.setItem("amount",$scope.totalamount);
     localStorage.setItem("tax",$scope.totaltax);
    if($scope.cartproductlist.length==0){
          $scope.cartclass = true;
          $scope.emptyclass = false;    
    }
     else{
          $scope.emptyclass = true;
     $scope.cartclass = false;
    }
     }
     else{
          $scope.emptyclass = false;
          $scope.cartclass = true;
    }
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

    $scope.deleteproduct = (list)=>{
         console.log(list);
       list.Active = false;
        console.log(list);
     var finalarr =    cart.filterfunction($scope.cartproductlist)
     $scope.cartproductlist = finalarr;
        $scope.totalamount = cart.calculatetotal($scope.cartproductlist);
         var json = JSON.stringify($scope.cartproductlist);
          localStorage.setItem('storedata',json);
          console.log(localStorage);
          cart.load();
        var len = cart.cartlength($scope.cartproductlist);
         var json = JSON.stringify(len);
          localStorage.setItem('counter',json);
        if($scope.cartproductlist.length==0){
          $scope.emptyclass = false;
        $scope.cartclass = true;
    }
     else{
          $scope.emptyclass = true;
          $scope.cartclass = false;
          $scope.totalamount=0;
     }
    }
    
   $scope.updateminus= (list)=>{
    list.quantity--;
     
       
       $scope.totalamount=cart.calculatetotal($scope.cartproductlist);
        var json = JSON.stringify($scope.cartproductlist);
          localStorage.setItem('storedata',json);
   }
   $scope.updateplus = (list)=>{
     
       
       list.quantity++;
      
    $scope.totalamount   = cart.calculatetotal($scope.cartproductlist);
     var json = JSON.stringify($scope.cartproductlist);
          localStorage.setItem('storedata',json);
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
           obj.Item = $scope.cartproductlist[i].id;
          obj.Quantity =$scope.cartproductlist[i].quantity ;
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

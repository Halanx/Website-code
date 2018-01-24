'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:FavouriteCtrl
 * @description
 * # FavouriteCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('FavouriteCtrl', function ($scope,favourite,$window) {
       if(localStorage.getItem("isLogin") === null || JSON.parse(localStorage.getItem("isLogin"))==false){
     $window.location.href = "#login";
    }

    $scope.movex = true;
    $scope.checkFav = true;
        $scope.addsidebar = ()=>{
            $scope.movex = !$scope.movex;
        }
        $scope.counter= favourite.loadcounter();
     callfav();
    favourite.loaddata()
    function callfav(){
        if(localStorage.token){
     var token=favourite.gettoken();
       if(token==null || token==undefined){
      token=localStorage.getItem("token");
    } 
       var promise = favourite.favlist(token);
               promise.then(function(data){
        console.log(data.FavoriteItems);
$scope.arr = data.FavoriteItems;
if($scope.arr=="") {
    $scope.checkFav = false;
    console.log($scope.checkFav);
}
      },function(err){
        // alert("err");   
    } )
        }
    }
    $scope.addfav = (data)=>{
        console.log(data)
         var token=favourite.gettoken();
        var val;
       data.FavoriteField = !data.FavoriteField;
//        data.FavoriteField = true;
        // if(data.FavoriteField==true){
            val = 0;
//            alert("true")
            
       var obj= {}
       obj.LastItem = data.id;
            
            console.log(obj.LastItem)

          
           
      var promise =   favourite.callfav(obj,val,token)
                 promise.then(function(data){
        console.log(data)
        $window.location.reload();


       
       
      },function(err){
        // alert("err");   
    } )
 
//         }
//         else{
            
//               val = 0;
// //            alert("true")
            
//        var obj= {}
//        obj.LastItem = data.id;
           
//             console.log(obj.LastItem)
// //            var mobilenumber = 8506078226;
          
            
//       var promise =   favourite.callfav(obj,val,token)
//                  promise.then(function(data){
//         console.log(data)


       
       
//       },function(err){
//         alert("err");   
//     } )  
            
            
//         }
    }
    $scope.add = (data, quantity)=>{
        console.log(data)
        data.quantity = quantity;
        console.log("ye wal h mera "+quantity);
            var match =  favourite.check(data)
   
       if(match.length==1){
          alert("Already present in cart")
       }
        else{
         favourite.addproduct(data)
       
        $scope.counter = favourite.arrlength();
            favourite.savecounter($scope.counter)
         Notification.requestPermission(function(){
            var n = new Notification("Halanx", {
                body : "ADDED TO CART",
                icon : "images/success.png"
            });
           },1000);
        }
    };

  });

'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('LandingCtrl', function ($scope,landing,common,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.sorry = true;
    $scope.store_list = true; 
     if((localStorage.getItem("isLogin") === null || JSON.parse(localStorage.getItem("isLogin"))==false)&&(localStorage.getItem("isLocated")==null || localStorage.getItem("isLocated")==false)){
     $window.location.href = "#login";
    }
    else if(localStorage.getItem("isLogin") == true){
        common.isLogin = true;
    }


        if(localStorage.getItem("isLocated")!=null){
          
            common.isLocated = JSON.parse(localStorage.getItem("isLocated"));
          
        }

        if(localStorage.getItem("storedata")!=null){
            var counter_length = JSON.parse(localStorage.getItem("storedata")).length;
            $scope.counter = counter_length
        }
         else{
            $scope.counter = 0;
        }
    storename();

    $scope.movex = true;

    $scope.addsidebar = ()=>{
        $scope.movex = !$scope.movex;
    }

    function storename()
    {   if(localStorage.getItem("obj1") && localStorage.getItem("obj1").length>1){
        var lat = JSON.parse(localStorage.getItem("obj1")).Latitude;
        var lon = JSON.parse(localStorage.getItem("obj1")).Longitude;
    //   if(lat && lon){
        console.log("hey");
        var promise = landing.callserver1(lat,lon);
    //   }
    }
    else{
        console.log("bey")
        var promise = landing.callserver();
    }
    promise.then(function(data){
        if(data.length>0){
        $scope.sorry = true;
        console.log(data)
        data.forEach(function(element) {
            element.logos = element.logos[0].logo_image;
        }, this);
        var Food  = data.filter(function(obj){
            return obj.StoreCategory == "Food" 
        })
        // && obj.Verified == true;
        var Grocery  = data.filter(function(obj){
            return obj.StoreCategory == "Grocery" 
        })
       $scope.stores = Food;
    //    $scope.stores.logos= $scope.stores.logos[0].logo_image; 
       console.log($scope.stores);
         $scope.grocery= Grocery;

    //    $scope.grocery.logos= $scope.grocery.logos[0].logo_image;
        console.log($scope.grocery)
    }
    else{
        $scope.sorry =false;
    }
      },function(err){
        // alert("err");   
    } );

    }
    // console.log(store);
    $scope.select=(store)=>{
        // console.log("store id is:",store.id)
        landing.save(store.id)
    }
    
  $scope.storelist = ()=>{
        console.log($scope.store)
        if($scope.store.length<1){
            $scope.store_list = true; 
        }
       var promise =  landing.storelist($scope.store)
           promise.then(function(data){
        console.log(data);
               $scope.store_list = false; 
               $scope.list = data;
               
               console.log($scope.list)
//               for( i=0;i<$scope.list.length;i++){
//                  console.log($scope.list[i].source)
//               }
      
      },function(err){
//        alert("err");   
    } );
    }
    $scope.checkstore = (store)=>{
          landing.save(store._source.Id)
          
        console.log(store._source.Id)
       if(store._source.StoreCategory=="Food"){
            
             $window.location.assign("#/food");
        }
        else if(store._source.StoreCategory=="Grocery"){
            $window.location.assign("#/foodmain");
        }
    }

    $scope.backToMainPage = ()=>{
        $window.location.reload();
        // setTimeout(()=>{
            $window.location.assign("#");
        // },100);
        
    }

    $scope.findAllStore = ()=>{
        var promise = landing.callserver();
        promise.then(function(data){
        $scope.sorry = true;
        console.log(data)
        data.forEach(function(element) {
            element.logos = element.logos[0].logo_image;
        }, this);
        var Food  = data.filter(function(obj){
            return obj.StoreCategory == "Food" 
        })
        // && obj.Verified == true;
        var Grocery  = data.filter(function(obj){
            return obj.StoreCategory == "Grocery" 
        })
       $scope.stores = Food;
    //    $scope.stores.logos= $scope.stores.logos[0].logo_image; 
       console.log($scope.stores);
         $scope.grocery= Grocery;

    //    $scope.grocery.logos= $scope.grocery.logos[0].logo_image;
        console.log($scope.grocery)
    
      },function(err){
        // alert("err");   
    } );    
    }
  });

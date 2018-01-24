'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:AccountsCtrl
 * @description
 * # AccountsCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('AccountsCtrl', function ($scope,accounts,$window) {
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
    $scope.menu = false;
    $scope.movex = true;
    $scope.addsidebar = ()=>{
      $scope.movex = !$scope.movex;
  }
         userinfo();
    function userinfo()
    {
   var token = accounts.gettoken();
    if(token==null || token==undefined){
      token=localStorage.getItem("token");
    }     
    var promise = accounts.info(token);
    promise.then(function(data){
    console.log(data);
    console.log(data.FirstName)
    $scope.FirstName = data.user.first_name;
    localStorage.setItem('firstname',$scope.FirstName);
    $scope.LastName = data.user.last_name;
    $scope.EmailId = data.user.email;
    localStorage.setItem('email',$scope.EmailId);
    $scope.Phoneno = data.PhoneNo;
    localStorage.setItem('mobilenumber',$scope.Phoneno);
    $scope.password = data.password
    }
      ,function(err){
           
    } 
    )
}
    $scope.hello = "hello"
  });

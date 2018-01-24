'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:ShopperCtrl
 * @description
 * # ShopperCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('ShopperCtrl', function ($scope,shopper) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.submitform = ()=>{
    
        var obj = {};
        obj.FirstName = $scope.firstname;
        obj.LastName = $scope.lastname;
        obj.PhoneNo = $scope.mobilenumber;
        obj.EmailId = $scope.email;
        obj.password=$scope.password;
        obj.City = $scope.city;
        obj.username = "s" + $scope.mobilenumber;
         
        console.log(obj)
       
          var promise = shopper.callserver(obj);
          promise.then((data)=>{
				 
				console.log(data);
			},(err)=>{
				alert("error");
			})
       
    }
  });

'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:ShopperCtrl
 * @description
 * # ShopperCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('ShopperCtrl', function ($scope,shopper,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.message ="";
    $scope.submitform = ()=>{
    
        var obj = {};
        obj.FirstName = $scope.firstname;
        obj.LastName = $scope.lastname;
        obj.PhoneNo = $scope.mobilenumber;
        obj.email = $scope.email;
        obj.password=$scope.password;
        obj.City = $scope.city;
        obj.username = "s" + $scope.mobilenumber;
         
        console.log(obj)
       
          var promise = shopper.callserver(obj);
          promise.then((data)=>{
				 $scope.message = "Successfully registered, Halanx will contact you within next 2-3 business days."
				console.log(data);
			},(err)=>{
				$window.location.assign("#login");
			})
       
    }
  });

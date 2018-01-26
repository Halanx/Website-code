'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:StoreCtrl
 * @description
 * # StoreCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('StoreCtrl', function ($scope,store,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
     $scope.message = "";
    $scope.submitform = ()=>{
    
        var obj = {
          "FirstName": $scope.firstname,
          "LastName":$scope.lastname,
          "dealer-designation":$scope.desig,
          "email":$scope.email,
          "password":$scope.password,
          "dealer-contact-number": $scope.mobilenumber
        };

        // obj.FirstName = $scope.firstname;
        // obj.LastName = $scope.lastname;
        // obj.dealer = $scope.storename;
        // // obj.StoreAddress = $scope.storeaddress;
        // obj.email=$scope.email
        // obj.password = $scope.password;
         
        console.log(obj)
       
          var promise = store.callserver(obj);
          promise.then((data)=>{
            $scope.message = "Successfully registered, Halanx will contact you within next 2-3 business days."
				console.log(data);
			},(err)=>{
				//  $scope.message = "Please Try Again!";
			})
       
    }
  });

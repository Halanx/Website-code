'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:HxpaCtrl
 * @description
 * # HxpaCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('HxpaCtrl', function ($scope,$rootScope,hxpa,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.submitform = ()=>{
    
        var obj = {
          "FirstName" : $scope.firstname,
          "LastName" : $scope.lastname,
          "email" : $scope.email,
          "password" : $scope.password,
          "dealer-designation" : $scope.designation,
          "dealer-contact-number" : $scope.number
        };
         
        console.log(obj)
       
          var promise = hxpa.callserver(obj);
          promise.then((data)=>{
                console.log(data);
                localStorage.setItem("store_token",data.data.key);
                localStorage.setItem("store_id",data.data.store_id);
                $window.location.assign("#hxpaabout");
                $window.location.reload();
			},(err)=>{
				console.log("error");
			})
       
    }
  });

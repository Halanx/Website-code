'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:StoreCtrl
 * @description
 * # StoreCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('StoreCtrl', function ($scope,store) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.submitform = ()=>{
    
        var obj = {};
        obj.Dealer_FirstName = $scope.firstname;
        obj.Dealer_LastName = $scope.lastname;
        obj.StoreName = $scope.storename;
        obj.StoreAddress = $scope.storeaddress;
        obj.Dealer_EmailId=$scope.email
        obj.Dealer_password = $scope.password;
         
        console.log(obj)
       
          var promise = store.callserver(obj);
          promise.then((data)=>{
				 
				console.log(data);
			},(err)=>{
				
				alert("error");
			})
       
    }
  });

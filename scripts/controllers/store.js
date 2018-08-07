'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:StoreCtrl
 * @description
 * # StoreCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('StoreCtrl', function ($scope, $rootScope, store, $window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.isMerchantPage = true;
    $scope.message = "";
    $rootScope.$on("$locationChangeStart", function () {
      $rootScope.isMerchantPage = false;
    });
    $scope.submitform = () => {

      var obj = {
        "first_name": $scope.firstname,
        "last_name": $scope.lastname,
        "dealer_designation": $scope.desig,
        "email": $scope.email,
        "password": $scope.password,
        "dealer_contact": $scope.mobilenumber
      };

      // obj.FirstName = $scope.firstname;
      // obj.LastName = $scope.lastname;
      // obj.dealer = $scope.storename;
      // // obj.StoreAddress = $scope.storeaddress;
      // obj.email=$scope.email
      // obj.password = $scope.password;

      console.log(obj)

      var promise = store.callserver(obj);
      promise.then((data) => {
        $scope.message = "Successfully registered, Halanx will contact you within next 2-3 business days."
        console.log(data);
      }, (err) => {
        //  $scope.message = "Please Try Again!";
      })

    }
  });

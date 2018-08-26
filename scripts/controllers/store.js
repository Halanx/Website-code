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
    $scope.user = {
      first_name: "",
      last_name: "",
      dealer_designation: "",
      email: "",
      password: "",
      dealer_contact: ""
    };
    $scope.submitform = () => {
      var verified = true;
      for (let k in $scope.user) {
        // console.log('[' + k + '] : [' + $scope.user[k] + ']');
        if (!$scope.user[k]) {
          verified = false;
        }
      }
      if (verified) {
        store.callserver($scope.user).then((data) => {
          $scope.message = "Successfully registered, Halanx will contact you within next 2-3 business days."
          console.log(data);
        }, (err) => {
          //  $scope.message = "Please Try Again!";
        });
      }
      else {
        alert("Fill out fields properly!");
      }

    }
  });

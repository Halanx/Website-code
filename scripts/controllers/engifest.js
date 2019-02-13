'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:CareerCtrl
 * @description
 * # CareerCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('EngifestCtrl', function ($scope, $location, engiService) {
    $scope.msg = "EngiYay";

    $scope.modalView = function (name) {
      document.getElementById(name).style.display = 'flex';
      document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    }

    $scope.modalClose = function (name) {
      document.getElementById(name).style.display = 'none';
      document.getElementsByTagName('body')[0].style.overflowY = 'unset';
    }

    $scope.engi_booking = () => {
      var token = localStorage.getItem("token");
      if (!token) {
        console.log("!logged in");
        $location.path('/login').search({ ref: 'engifest2019' });
      }
      else {
        console.log("logged in");
        engiService.getPass(token)
          .then(
            function (data) {
              console.log(data.data);
              $scope.pass = data.data;
              $scope.modalView('engifest-2019-pass');
            },
            function (err) {
              console.log(err.data);
            }
          );
      }
    }
  });

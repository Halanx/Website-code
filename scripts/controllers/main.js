'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('MainCtrl', function ($scope, $location, $window, main) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    localStorage.setItem("counter", 0);

    if (JSON.parse(localStorage.getItem("isLogin")) == true || (localStorage.getItem("isLocated") != null && localStorage.getItem("isLocated") == true)) {
      //  $window.location.assign("#stores");
      // $window.location.assign("#");
    }


    if (JSON.parse(localStorage.getItem("storeLogin")) == true) {
      $window.location.assign("#dashboard");
    }

    $scope.checkLocation = () => {
      if ($scope.location != undefined && $scope.location != null) {
        if ($scope.location != "") {
          console.log($scope.location);
          localStorage.setItem("isLocated", true);
          $window.location.assign("#stores");
          $window.location.reload();
        }
      }
    }

    $scope.engi = () => {
      $location.path('/engifest-2019');
    }

    $scope.splash = () => {
      $location.path('/splash-2019');
    }

    $scope.banner = [
      {
        img: 'https://d28fujbigzf56k.cloudfront.net/media/public/Info/HomeBox/7/HalanxAppBanner1.png',
        name: 'engi'
      },
      {
        img: 'https://d28fujbigzf56k.cloudfront.net/media/public/Info/HomeBox/7/20190215_182210_0001.png',
        name: 'splash'
      }
    ];

    $scope.getHomeBox = () => {
      var token = localStorage.getItem('token');
      main.getHomeBoxes(token)
        .then(
          function (data) {
            console.log(data.data);
          },
          function (err) {
            ;
            console.log(err.data);
          }
        );
    }

  });

'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:RegisterotpCtrl
 * @description
 * # RegisterotpCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('RegisterotpCtrl', function ($scope, registerotp, $location, $routeParams, common) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.submitform = () => {

      var obj = {};
      var firstname = localStorage.getItem('FirstName');
      obj.first_name = firstname;
      var lastname = localStorage.getItem('LastName');
      obj.last_name = lastname;
      var phoneno = localStorage.getItem('PhoneNo');
      obj.phone_no = phoneno;
      var email = localStorage.getItem('email');
      obj.email = email;
      var password = localStorage.getItem('password');
      obj.password = password;
      obj.otp = parseInt($scope.otp);
      obj.username = "c" + obj.phone_no;


      console.log(obj)

      var promise = registerotp.callserver(obj);
      promise.then((data) => {

        console.log(data.key);
        var key = data.key;
        localStorage.setItem("token", key);
        common.isLogin = true;
        localStorage.setItem("isLogin", common.isLogin);

        // $window.location.href = "https://www.halanx.com/halanx-final/new1big-kfc/frontpage/login.html";
        // $window.location.assign("#stores");
        if ($routeParams.ref == 'engifest2019') {
          console.log("hi ref");
          $location.path('/engifest-2019');
        }
      }, (err) => {

        alert("error");
      })

    }
  });

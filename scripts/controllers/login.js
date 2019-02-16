'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('LoginCtrl', function ($scope, $window, $routeParams, login, common, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    if (common.isStore === true) {
      $window.location.assign("#hxpalogin");
    }
    else if (common.isLogin == true) {
      $window.location.assign("#stores");
    }


    $scope.mobileError = false;
    $scope.passwordError = false;

    $scope.mobilenumber = "";
    $scope.password = "";

    $scope.loginVerify = () => {

      if ($scope.mobilenumber.length == 0) {
        $scope.mobileError = true;
      } else {
        $scope.mobileError = false;
      }
      if ($scope.password.length == 0) {
        $scope.passwordError = true;
      } else {
        $scope.passwordError = false;
      }
    }

    $scope.submitform = () => {
      $scope.loginVerify();
      $scope.mismatchError = false;
      console.log(common.isLocated);
      if ($scope.mobileError == false && $scope.passwordError == false) {
        var obj = {};


        obj.username = "c" + $scope.mobilenumber;
        obj.password = $scope.password;
        var mobilenumber = $scope.mobilenumber;
        localStorage.setItem('mobilenumber', mobilenumber);

        console.log(obj)

        var promise = login.callserver(obj);
        promise.then((data) => {

          console.log("data is:", data);

          if (data.key) {
            if ($routeParams.ref == 'engifest2019') {
              console.log("hi ref");
              $location.path('/engifest-2019');
            }

            if ($routeParams.ref == 'splash2019') {
              console.log("hi ref");
              $location.path('/splash-2019');
            }

            common.isLogin = true;
            localStorage.setItem("isLogin", common.isLogin);
            console.log(common.isLocated);
            if (common.isLocated == true) {
              localStorage.setItem("isLocated", false);
              // $window.location.href = "#stores";
              $window.location.reload();
            }


            else {
              // $window.location.href = "#stores";
            }


          }
        }, (err) => {
          $scope.mismatchError = true;
          console.log("error");
        })
      }
    };

    $scope.register = ()=>{
      $location.path('/register');
    }

    $scope.fbLogin = () => {
      FB.login(function (response) {
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          FB.api('/me', function (response) {
            console.log('Good to see you, ' + response.name + '.');
            let fbAuth = FB.getAuthResponse();
            console.log(response);
            console.log(fbAuth);
            let FirstName = response.name.split(" ")[0];
            localStorage.setItem('FirstName', FirstName);
            let accessObj = { "access_token": fbAuth.accessToken };
            login.fbLoginKey(accessObj).then(function (data) {
              console.log(data.data.key);
              let key = data.data.key;
              localStorage.setItem('token', key);

              login.checkLogin(key).then(function (data) {
                console.log(data);
                if (data.status == 200) {
                  common.isLogin = true;
                  localStorage.setItem("isLogin", common.isLogin);
                  if (common.isLocated == true) {
                    localStorage.setItem("isLocated", false);
                    // $window.location.href = "#cart";
                  }


                  else {
                    // $window.location.href = "#stores";
                  }
                  if ($routeParams.ref == 'engifest2019') {
                    console.log("hi ref");
                    $location.path('/engifest-2019');
                  }
                  else if ($routeParams.ref == 'splash2019') {
                    console.log("hi ref");
                    $location.path('/splash-2019');
                  }
                  else $location.path('/');
                }
              }, function (err) {
                console.log(err);
                if (err.status == 404) {
                  $window.location.assign("#socialregister");
                }
              })
            }, function (err) {
              console.log(err);
            });
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      });
    }


  });

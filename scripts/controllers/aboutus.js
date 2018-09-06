'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:AboutusCtrl
 * @description
 * # AboutusCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('AboutusCtrl', function ($scope, $http, $q, aboutus, $window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    onLoad();
    var token = '23a99a2e07aa513e7a284b2fb110a49c2024be3d';
    function onLoad() {
      var promise = aboutus.getMembers();
      promise.then((data) => {
        console.log(data);
        $scope.team = data;
      });
    };

    $scope.payd = {};

    $scope.x = function () {
      var pr = $q.defer();
      $http.post('https://api.halanx.com/transactions/payu/generate_hash/web/', { amount: 300 }, {
        headers: {
          "Authorization": "Token " + token
        }
      })
        .then(
          function (data) {
            $scope.payd.key = data.data.key;
            $scope.payd.firstname = data.data.firstname;
            $scope.payd.email = data.data.email;
            $scope.payd.amount = data.data.amount;
            $scope.payd.hash = data.data.hash;
            $scope.payd.productinfo = data.data.productinfo;
            $scope.payd.phone = '9898989898';
            $scope.payd.txnid = data.data.txnid;
            $scope.payd.surl = 'https://share.halanx.com/vTransactionEvent/homes?token=';
            $scope.payd.furl = 'https://google.com';
            var pr = $q.defer();
            $http.post(data.data.action, $scope.payd)
              .then(
                function (data) {
                  console.log(data.data);
                },
                function (err) {
                  $scope.error = err;
                  console.log("ERROR");
                }
              ).catch(function (err) {
                console.log("ERROR");
              });
            return pr.promise;
            console.log($scope.payd);
          },
          function (err) {
            $scope.error = err;
            console.log("ERROR");
          }
        )
    }

    $scope.goToCareer = () => {
      $window.location.assign("#career");
    }
  });
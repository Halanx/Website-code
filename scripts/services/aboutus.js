'use strict';

/**
 * @ngdoc service
 * @name halanxApp.aboutus
 * @description
 * # aboutus
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('aboutus', function ($q, $http) {

    return {
      getMembers: function () {
        var pr = $q.defer();
        var url = "https://api.halanx.com/team/";

        $http.get(url).then((data) => {
          pr.resolve(data.data);
        }, (err) => {
          pr.reject(err);
        });

        return pr.promise;
      }
    };
  });

angular.module('halanxApp').service("PaymentService", function ($http, $q) {
  this.createHash = function (data, token) {
    var pr = $q.defer();
    $http.post('https://api.halanx.com/transactions/payu/generate_hash/web/', data, {
      headers: {
        "Authorization": "Token " + token
      }
    })
      .then(function (data) {
        pr.resolve(data);
      }, function (err) {
        pr.reject(err);
      }).catch(function (err) {
        console.log("ERROR");
      });
    return pr.promise;
  };

  this.requestGateway = function (url, data, token) {
    var pr = $q.defer();
    $http.post(url, data)
      .then(function (data) {
        pr.resolve(data);
      }, function (err) {
        pr.reject(err);
      }).catch(function (err) {
        console.log("ERROR");
      });
    return pr.promise;
  }
});
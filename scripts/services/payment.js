'use strict';

/**
 * @ngdoc service
 * @name halanxApp.payment
 * @description
 * # payment
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('payment', function ($http, $q) {

    return {
      createHash: function (obj, key) {
        var url = "https://api.halanx.com/transactions/payu/generate_hash/";
        var defer = $q.defer();
        $http.post(url, obj, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + key
          }
        }).then((data) => {
          defer.resolve(data.data);
        }, (err) => {
          defer.reject(err);
        });

        return defer.promise;
      },
      genHash: function (data, token) {
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
      },
      addMoneyStore: function (data, token) {
        var pr = $q.defer();
        $http.post('https://api.halanx.com/stores/wallet/add_money/', data, {
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
      },
      withdrawMoneyStore: function (data, token) {
        var pr = $q.defer();
        $http.post('https://api.halanx.com/stores/wallet/withdraw_money/', data, {
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
      },
      cod: function (obj, key) {
        console.log(obj);
        obj.CashOnDelivery = true;
        var defer = $q.defer();
        var url = "https://api.halanx.com/orders/";
        $http.post(url, obj, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + key
          }
        }).then((data) => {
          defer.resolve(data.data);
        }, (err) => {
          defer.reject(err);
        });
        return defer.promise;
      },
      bill: function (key) {

        var pr = $q.defer();
        var url = "https://api.halanx.com/carts/detail";


        $http.get(url, {
          //             withCredentials: true,
          headers: {
            'Authorization': 'Token ' + key
          }
        }).then(function (data) {
          pr.resolve(data.data)
          console.log("success")

        },
          function (err) {
            pr.reject(err)
            console.log("error")

          }
        )
        return pr.promise
      }
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name halanxApp.main
 * @description
 * # main
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
    .factory('main', function ($http, $q) {
        var object = {
            getHomeBoxes: function (token) {
                let pr = $q.defer();
                var url = "https://api.halanx.com/info/home/";
                $http.get(url,{
                    headers: {
                        "Authorization": "Token " + token
                    }
                }).then(function (data) {
                    pr.resolve(data.data);
                }, function (err) {
                    pr.reject(err);
                });

                return pr.promise;
            }
        }
        return object;

    });

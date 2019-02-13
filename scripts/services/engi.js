'use strict';

/**
 * @ngdoc service
 * @name halanxApp.faq
 * @description
 * # faq
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
    .factory('engiService', function ($http, $q) {

        return {
            getPass: function (token) {
                let url = "https://api.halanx.com/promotions/campaign/1/";
                let pr = $q.defer();
                $http.get(url, {
                    headers: {
                        "Authorization": "Token " + token
                    }
                }).then((data) => {
                    pr.resolve(data);
                }, (err) => {
                    pr.reject(err);
                });
                return pr.promise;
            }
        };
    });

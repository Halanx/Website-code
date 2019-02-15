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
            getEngiPass: function (token) {
                let url = "https://api.halanx.com/promotions/campaign/1/entrypass/";
                let pr = $q.defer();
                $http.post(url, { platform: "web" }, {
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

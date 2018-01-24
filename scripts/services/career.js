'use strict';

/**
 * @ngdoc service
 * @name halanxApp.career
 * @description
 * # career
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('career', function ($http,$q) {
    
    return {
      callCareer: function () {
        var pr = $q.defer();
        var url = "https://api.halanx.com/careers/";
        $http.get(url).then((data)=>{
          pr.resolve(data.data);
        },(err)=>{
          pr.reject(err);
        });

        return pr.promise;
      }
    };
  });

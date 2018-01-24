'use strict';

/**
 * @ngdoc service
 * @name halanxApp.aboutus
 * @description
 * # aboutus
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('aboutus', function ($q,$http) {
    
    return {
      getMembers: function () {
        var pr = $q.defer();
        var url = "https://api.halanx.com/team/";

        $http.get(url).then((data)=>{
          pr.resolve(data.data);
        },(err)=>{
          pr.reject(err);
        });

        return pr.promise;
      }
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name halanxApp.faq
 * @description
 * # faq
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('faq', function ($http,$q) {
   
    return {
      getCategory: function () {
        let url = "https://api.halanx.com/faq/";
        let pr = $q.defer();

        $http.get(url).then((data)=>{
          pr.resolve(data.data);
        },(err)=>{
          pr.reject(err);
        });

        return pr.promise;
      },

      getTopic : function(slug){
        let url = "https://api.halanx.com/faq/"+slug+"/";
        let pr = $q.defer();

        $http.get(url).then((data)=>{
          pr.resolve(data.data);
        },(err)=>{
          pr.reject(err);
        });

        return pr.promise;
      },

      getQuestion:function(slug,slug1){
        let url = "https://api.halanx.com/faq/"+slug+"/"+slug1+"/";
        let pr = $q.defer();

        $http.get(url).then((data)=>{
          pr.resolve(data.data);
        },(err)=>{
          pr.reject(err);
        });

        return pr.promise;
      }

    };
  });

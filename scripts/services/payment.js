'use strict';

/**
 * @ngdoc service
 * @name halanxApp.payment
 * @description
 * # payment
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('payment', function ($http,$q) {
   
    return {
      createHash: function(obj,key){
        var url = "https://api.halanx.com/transactions/payu/generate_hash/";
        var defer = $q.defer();
        $http.post(url,obj,{
           headers: {
                    'Content-Type':'application/json',
                    'Authorization': 'Token ' + key 
                }
            }).then((data)=>{
              defer.resolve(data.data);
            },(err)=>{
              defer.reject(err);
            });

            return defer.promise;
      },
      cod: function (obj,key) {
        var defer = $q.defer();
        var url = "https://api.halanx.com/orders/";
        $http.post(url,obj,{
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': 'Token ' + key 
                }
            }).then((data)=>{
              defer.resolve(data.data);
            },(err)=>{
              defer.reject(err);
            });
        return defer.promise;    
      }
    };
  });

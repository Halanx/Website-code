'use strict';

/**
 * @ngdoc service
 * @name halanxApp.dashboard
 * @description
 * # dashboard
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('dashboard', function ($q,$http) {
    
    return {
      DashCall(key){
        var pr = $q.defer();
				var url = "https://api.halanx.com/stores/cart-items/";
            // console.log(obj);
				$http.get(url, {
            headers: {
                'Authorization': 'Token ' +key 
            }
          }).then(function(data){
					pr.resolve(data);
                    console.log("Data Posted",data);
				}
					,function(err){
					pr.reject(err);	
					console.log(" Error");
					});
            return pr.promise;
      },
      PaymentCall(key){
        var pr = $q.defer();
				var url = "https://api.halanx.com/stores/payments/";
            // console.log(obj);
				$http.get(url, {
            headers: {
                'Authorization': 'Token ' +key 
            }
          }).then(function(data){
					pr.resolve(data);
                    console.log("Data Posted",data);
				}
					,function(err){
					pr.reject(err);	
					console.log(" Error");
					});
            return pr.promise;
      }
    };
  });

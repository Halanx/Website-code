'use strict';

/**
 * @ngdoc service
 * @name halanxApp.hxpa
 * @description
 * # hxpa
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('hxpa', function ($http,$q) {
    var object =  {
        callserver : function(obj){
            var pr = $q.defer();
				var url = "https://api.halanx.com/stores/register/";
            console.log(obj);
				$http.post(url,obj).then(function(data){
					pr.resolve(data);
                    console.log("Data Posted",data);
                    // location.assign("/hxpaabout");
				}
					,function(err){
					pr.reject(err);	
					console.log(" Error");
					});
            return pr.promise;
				}
				}
    return object;
  });

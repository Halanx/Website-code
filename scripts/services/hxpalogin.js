'use strict';

/**
 * @ngdoc service
 * @name halanxApp.hxpalogin
 * @description
 * # hxpalogin
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('hxpalogin', function ($http,$q) {
    var object =  {
        callserver : function(obj){
            var pr = $q.defer();
				var url = "https://api.halanx.com/rest-auth/login/";
            console.log(obj);
				$http.post(url,obj).then(function(data){
					pr.resolve(data);
                    console.log("key", data);
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

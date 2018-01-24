'use strict';

/**
 * @ngdoc service
 * @name halanxApp.hxpaabout
 * @description
 * # hxpaabout
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('hxpaabout', function ($http,$q) {
    var object =  {
        gettoken : function(){
          var token = localStorage.getItem("token");
          return token; 
        },
        callserver : function(obj,key,storeid){
          console.log(key);
            var pr = $q.defer();
				var url = "https://api.halanx.com/stores/"+storeid+"/";
            console.log(obj);
				$http.patch(url,obj, {
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
				}
    return object;
  });

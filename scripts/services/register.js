'use strict';

/**
 * @ngdoc service
 * @name halanxApp.register
 * @description
 * # register
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('register', function ($http,$q) {
      var object =  {
		
		
        callserver : function(obj){
            console.log(obj)
            var pr = $q.defer();
				var url = "https://api.halanx.com/users/getotp/" + obj.PhoneNo+"/";
            console.log(obj);
				$http.post(url,obj).then(function(data){
					pr.resolve(data.data);
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

'use strict';

/**
 * @ngdoc service
 * @name halanxApp.socialregister
 * @description
 * # socialregister
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('socialregister', function ($http,$q) {
    
    return {
      callserver: (obj,PhoneNo)=>{
        let url = "https://api.halanx.com/users/getotp/" + PhoneNo+"/";
      var pr = $q.defer();
			$http.post(url,obj).then(function(data){
					pr.resolve(data.data);
					console.log("Data Posted",data);
//                    alert("success");
                    
				}
					,function(err){
					pr.reject(err);	
					console.log(" Error");

					});
            return pr.promise;
    },

    callserver1 : function(obj,key){
         
            var pr = $q.defer();
            console.log(key);  
        $http({
        method: 'POST',
        url: 'https://api.halanx.com/users/social/',
        headers: {
         'Content-Type':'application/json',
         'Authorization': 'token '+key
        },
        data: {
	        "PhoneNo":obj.PhoneNo,
	        "otp":obj.otp
          }
      }).then(function(data){
					pr.resolve(data);
					console.log(data); 
				}
					,function(err){
					pr.reject(err);	
					console.log(err);
					});
            return pr.promise;
				}
      
    }
  });

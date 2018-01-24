'use strict';

 
angular.module('halanxApp')
  .factory('forgetpassotp', function ($http, $q,$window) {
        var object =  {
		
		
        callserver : function(obj){
            console.log(obj)
            var pr = $q.defer();
				var url = "https://api.halanx.com/users/loginotp/";
                console.log(obj);
				$http.post(url,obj).then(function(data){
					pr.resolve(data.data);
					 
                    //alert("success");
                    console.log("Token",data.data.key);

                    var key= data.data.key;
                    console.log(key);
              		 localStorage.setItem('key1',key);

                    $window.location.href='#/forgetpassnew';
                     
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

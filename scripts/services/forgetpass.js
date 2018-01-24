'use strict';

/**
 * @ngdoc service
 * @name halanxApp.forgetpass
 * @description
 * # forgetpass
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('forgetpass', function ($http, $q,$window) {
   	var object = {
		arr: [],
		callserver: function (obj) {
			console.log(obj)
			var pr = $q.defer();
			var url = "https://api.halanx.com/users/getotp/"+obj.username+"/";

					$http.post(url,obj).then(function(data){
					pr.resolve(data.data);
					console.log("OTP Received",data);
                    //alert(data.data);
                    $window.location.href='#/forgetpassotp';

				},
				function (err) {
					pr.reject(err);
					console.log("error");
					 
				}
			);
			return pr.promise;
		}
	}
	return object;
  });

'use strict';

/**
 * @ngdoc service
 * @name halanxApp.login
 * @description
 * # login
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('login', function ($http,$q) {
    var object =  {
        callserver : function(obj){
            console.log(obj);
            let pr = $q.defer();
			var url = "https://api.halanx.com/rest-auth/login/";
            console.log(obj);
			$http.post(url,obj).then(function(data){
				pr.resolve(data.data);
				console.log("Token",data.data.key);

                // let token = JSON.stringify(data.data.key);
                let token = data.data.key;
                localStorage.setItem('token', token);
            
			},function(err){
        pr.reject(err);
      });

            return pr.promise;
				},
        fbLoginKey : (access_token)=>{
          let pr = $q.defer();
          // console.log(access_token);
          var url = "https://api.halanx.com/rest-auth/facebook/";
          $http.post(url,access_token).then(function(data){
            pr.resolve(data);
            console.log(data.data);
            
          },
          function(err){
            pr.reject(err);
          });
          return pr.promise;
        },

        checkLogin : (key)=>{
          let pr = $q.defer();
          
          $http({method: 'GET', url: "https://api.halanx.com/users/detail/", 
          headers: {
          "Content-Type": "application/json",
          "Authorization": 'token '+key
          }
          }).then(function(data){
            pr.resolve(data);
            console.log(data);
            
          },
          function(err){
            pr.reject(err);
          });
          return pr.promise;
        }
				}
    return object;

  });

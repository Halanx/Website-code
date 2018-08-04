'use strict';

/**
 * @ngdoc service
 * @name halanxApp.business
 * @description
 * # business
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('business', function ($http,$q) {
    var object =  {
        gettoken : function(){
          var token = localStorage.getItem("token");
          return token; 
        },

        callBusiness(key){
          var pr = $q.defer();
				var url = "https://api.halanx.com/stores/user/";
            
				$http.get(url, {
            headers: {
                'Authorization': 'Token ' +key 
            }
          }).then(function(data){
					pr.resolve(data.data);
                   console.log("user data ",data.data);
				}
					,function(err){
					pr.reject(err);	
					console.log(" Error");
					});
            return pr.promise;
        },

        callserver : function(obj,key,sid){
          console.log(key);
            var pr = $q.defer();
				var url = "https://api.halanx.com/stores/"+sid+"/";
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
				},
        getdata : function(key,sid){
          console.log(key);
            var pr = $q.defer();
				var url = "https://api.halanx.com/stores/" + sid ;
				$http.get(url, {
            headers: {
                'Authorization': 'Token ' +key 
            }
          }).then(function(data){
					pr.resolve(data);
                    console.log("Data",data);
				}
					,function(err){
					pr.reject(err);	
					console.log(" Error");
					});
            return pr.promise;
				},
        dateTime : function(obj,key){
          console.log(key);
            var pr = $q.defer();
				var url = "https://api.halanx.com/stores/opening_hours/edit/";
            console.log(obj);
				$http.patch(url,obj, {
            headers: {
                'Authorization': 'Token ' +key ,
                'Content-Type': 'application/json'
            }
          }).then(function(data){
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

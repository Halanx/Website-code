'use strict';

/**
 * @ngdoc service
 * @name halanxApp.orders
 * @description
 * # orders
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('orders', function ($http,$q) {
     var object = {
        getorderon : function(key){
                  
              var pr = $q.defer();
         var url = "https://api.halanx.com/orders/user";
        
                
         $http.get(url, {
//                withCredentials: true,
                headers: {
                    'Authorization': 'Token ' + key 
                }
            }).then(function(data){
                console.log("order data is:",data.data);
             pr.resolve(data.data)
             console.log("success")
        
         },
                             function(err){
             pr.reject(err)
             console.log("error")
             
         }
         )
         return pr.promise
        },
         gettoken : function(){
         var token = localStorage.getItem("token");
         
          return token; 
        },

        trackOrder : function(key,orderid){
                  
              var pr = $q.defer();
         var url = "https://api.halanx.com/orders/"+orderid+"/track/";
                
         $http.get(url, {
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': 'Token ' + key 
                }
            }).then(function(data){
                console.log("tracking is",data.data);
             pr.resolve(data.data)
             
        
         },
          function(err){
             pr.reject(err)
             console.log("error")
             
         }
         )
         return pr.promise
        },
        cancelOrder:function(key,orderid){
            console.log(key);
            let pr = $q.defer();
            let url = "https://api.halanx.com/orders/"+orderid+"/cancel/";
            $http.patch(url,{},{
                headers: {
                    'Authorization': 'token ' + key 
                }
            }).then(function(data){
                console.log("tracking is",data);
             pr.resolve(data);
             
        
         },
          function(err){
             pr.reject(err)
             console.log("error")
             
         }
         )
         return pr.promise
        }
    }
    return object;
  });

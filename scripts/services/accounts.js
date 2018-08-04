'use strict';

/**
 * @ngdoc service
 * @name halanxApp.register
 * @description
 * # register
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('accounts', function ($http,$q) {
     var object = {
      info : function(key){
           var pr = $q.defer();
         var url = "https://api.halanx.com/users/detail/";
        
                
         $http.get(url,{
//                withCredentials: true,
                headers: {
                    'Authorization': 'Token ' + key 
                }
            }).then(function(data){
             pr.resolve(data.data);
             console.log(data.data);
           
         },
                             function(err){
             pr.reject(err)
             console.log("error")
             
         }
         )
         return pr.promise
      } ,
        gettoken : function(){
         var token = localStorage.getItem("token")
           
          // var mytoken=JSON.parse(token)
          return token; 
        }
    }
    return object;
  });

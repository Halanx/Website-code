'use strict';

 
angular.module('halanxApp')
  .factory('forgetpassnew', function ($http,$q,$window) {
       var object = {


        callserver: function (obj,key) {
            console.log(obj)
            var pr = $q.defer();
            var url = "https://api.halanx.com/rest-auth/password/change/";
            console.log(obj);

           
            
            $http.post(url,obj,{headers: {
              'Authorization': 'Token '+key 
           }
       }).then(function (data) {
                
                pr.resolve(data.data);
                $window.location.href='#/login';

            }
                , function (err) {
                    pr.reject(err);
                    console.log(" Error");
                });
            return pr.promise;
        }


    }
    return object;
  });

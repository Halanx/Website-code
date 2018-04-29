'use strict';

/**
 * @ngdoc service
 * @name halanxApp.landing
 * @description
 * # landing
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('landing', function ($http, $q) {
    var object = {
        callserver: function () {
            var pr = $q.defer();
            var url = "https://api.halanx.com/stores/verified/";

            var key = "";

            $http.get(url).then(function (data) {
                    pr.resolve(data.data)
                    console.log("success")

                },
                function (err) {
                    pr.reject(err)
                    console.log("error")

                }

            )
            return pr.promise

        },
        callserver1: function (lat,lon) {
            var pr = $q.defer();
            var url = "https://api.halanx.com/stores/verified/?lat="+lat+"&lng="+lon;
            console.log(""+lat+" "+lon);
            var key = "";

            $http.get(url).then(function (data) {
                    console.log("nearby store:",data);
                    pr.resolve(data.data)
                },
                function (err) {
                    pr.reject(err)
                    console.log("error")

                }

            )
            return pr.promise

        },
        save: function (id) {
            var json = JSON.stringify(id)
            console.log(json);
            localStorage.setItem('storeid', json);
        },
        storelist: function (store) {
            var pr = $q.defer();
            var url = "https://api.halanx.com/stores/search/"+store;


            $http.get(url).then(function (data) {
                    pr.resolve(data.data.hits.hits)
                    console.log("success")

                },
                function (err) {
                    pr.reject(err)
                    console.log("error")

                }
            )
            return pr.promise
        },
        addproductonserver:function(element, key){

            var obj = {};
          obj.Item = element.id;
          obj.Quantity = element.quantity;
          obj.Notes = "";

          console.log(obj);

          var url = "https://api.halanx.com/carts/items/";
          var pr = $q.defer();
          
          $http.post(url,obj, {
//             withCredentials: true,
                headers: {
                    'Authorization': 'Token ' +key,
                    'Content-Type' : 'application/json'
                }
            }).then(function(data){
              // console.log(data);
              pr.resolve(data.data);
          },function(err){
              pr.reject(err);
          })
  
          return pr.promise;

          

          
       },
       getcartitemserver : function(key){
            var url = "https://api.halanx.com/carts/active/";
            var pr = $q.defer();
            
            $http.get(url, {
                headers: {
                    'Authorization': 'Token ' + key
                }
            }).then(function(data){
                console.log(data);
                pr.resolve(data.data);
            },function(err){
                pr.reject(err);
            })

            return pr.promise;
     },
    }

    return object;
  });

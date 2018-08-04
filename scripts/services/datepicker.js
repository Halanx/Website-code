'use strict';

/**
 * @ngdoc service
 * @name halanxApp.datepicker
 * @description
 * # datepicker
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('datepicker', function () {
      var object = {
       desired : function(){
            return ([{service:"as soon as possible",mark:false},{service:"schedule for later",mark:false}])
        },
    check(search){
  console.log(search);
  var get =  search.filter(function(check){

        return(check.mark ==true);
    })
 
//   console.log(get[0].mark);
        
get[0].mark = !get[0].mark;
  console.log(get)
        
 
    },
           time : function(){
            return ([{timing:"06:00-08:00",mark:true},{timing:"08:00-12:00",mark:false},{timing:"12:00-14:00",mark:false},{timing:"14:00-18:00",mark:false},{timing:"18:00-20:00",mark:false},{timing:"20:00-22:00",mark:false}])
        },
      gettrue(search){
          var get = search.filter(function(check){
              return(check.mark == true);
          })
          return get[0];
      }
      
  }  
  return object
  });

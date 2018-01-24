'use strict';

/**
 * @ngdoc service
 * @name halanxApp.common
 * @description
 * # common
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('common', function () {
      return {
     isLogin:false,
     isLocated:false,
     isStore:false
   };
  });

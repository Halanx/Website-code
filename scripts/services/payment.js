'use strict';

/**
 * @ngdoc service
 * @name halanxApp.payment
 * @description
 * # payment
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('payment', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });

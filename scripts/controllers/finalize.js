'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:FinalizeCtrl
 * @description
 * # FinalizeCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('FinalizeCtrl', function ($timeout,$scope) {
    
     $scope.loading_screen.finish();
     
  });

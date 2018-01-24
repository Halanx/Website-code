'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:CareerCtrl
 * @description
 * # CareerCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('CareerCtrl', function ($scope,career) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    onLoad();
    function onLoad(){
      var promise = career.callCareer();
      promise.then((data)=>{
        $scope.posting = data;
        console.log(data);
      })
    }
  });

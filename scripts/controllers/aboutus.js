'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:AboutusCtrl
 * @description
 * # AboutusCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('AboutusCtrl', function ($scope,aboutus,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    onLoad();
    function onLoad(){
    var promise = aboutus.getMembers();
    promise.then((data)=>{
      console.log(data);
      $scope.team = data;
    });
  };
  
  $scope.goToCareer = ()=>{
    $window.location.assign("#career");
  }
  });

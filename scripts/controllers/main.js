'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('MainCtrl', function ($scope,common,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    if(JSON.parse(localStorage.getItem("isLogin")) ==true || (localStorage.getItem("isLocated")!=null && localStorage.getItem("isLocated")==true)){
     $window.location.assign("#landing");
    }
    
    $scope.checkLocation = ()=>{
      if($scope.location!=undefined && $scope.location!=null){
          if($scope.location!=""){
            console.log($scope.location);
              localStorage.setItem("isLocated",true);
              $window.location.assign("#landing");
              $window.location.reload();
          }
      }
    }

   

  });

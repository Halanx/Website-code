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

    localStorage.setItem("counter",0);
    
    if(JSON.parse(localStorage.getItem("isLogin")) ==true || (localStorage.getItem("isLocated")!=null && localStorage.getItem("isLocated")==true)){
     $window.location.assign("#stores");
    }


    if(JSON.parse(localStorage.getItem("storeLogin"))==true){
      $window.location.assign("#dashboard");
    }
    
    $scope.checkLocation = ()=>{
      if($scope.location!=undefined && $scope.location!=null){
          if($scope.location!=""){
            console.log($scope.location);
              localStorage.setItem("isLocated",true);
              $window.location.assign("#stores");
              $window.location.reload();
          }
      }
    }

   

  });

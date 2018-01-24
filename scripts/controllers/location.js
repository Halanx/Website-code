'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:LocationCtrl
 * @description
 * # LocationCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('LocationCtrl', function ($scope,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
     if(localStorage.getItem("isLogin") === null || JSON.parse(localStorage.getItem("isLogin"))==false){
     $window.location.href = "#login";
    }
    // $window.location.reload();
     $scope.showclass = false;
   $scope.movex = true;

    $scope.addsidebar = ()=>{
        $scope.movex = !$scope.movex;
    }
$scope.addstore = ()=>{
    $scope.showclass = !$scope.showclass;
    
}
    

     $scope.addmodal = (data)=>{
         $scope.modal = data;
     }

   $scope.postreq = ()=>{
       $window.location.assign("#summary");
   }  

  });

 'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('IndexCtrl', function ($scope,common,$window,$route) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.loading_screen = pleaseWait({
        logo: "../../images/favicon.jpg",
        backgroundColor: '#ffffff',
        loadingHtml: '<div class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>'
      });
      
    $scope.index = {
      login:true,
      logout:true
    }

    $scope.showMe = ()=>{
      $window.location.reload();
      $window.location.assign("#");
    }
    
  //   if( localStorage.getItem("isLogin") !=null){
  //     if(localStorage.getItem("isLogin").length>0){
  //     common.isLogin = JSON.parse(localStorage.getItem("isLogin"));
  //   }
  // }
  
    $scope.$watch(function(){return common.isLogin}, function (newValue, oldValue) {
         
    if( localStorage.getItem("isLogin") !=null){
      if(localStorage.getItem("isLogin").length>0){
      common.isLogin = JSON.parse(localStorage.getItem("isLogin"));
    }
    }
           if(common.isLogin===false){
              $scope.index.login = false;
              $scope.index.logout = true;
             
           }
           else if(common.isLogin===true){
              $scope.index.login = true;
              $scope.index.logout = false;
           }
          
        }, true);

     $scope.$watch(function(){return common.isStore}, function (newValue, oldValue) {
         console.log(common.isStore);
          if( localStorage.getItem("storeLogin") !=null){
      if(localStorage.getItem("storeLogin").length>0){
      common.isStore = JSON.parse(localStorage.getItem("storeLogin"));
    }
          }
           if(common.isStore===false){
              $scope.index.login = false;
              $scope.index.logout = true;
             
           }
            if(common.isStore===true){
              $scope.index.login = true;
              $scope.index.logout = false;
           }
          
        }, true);    

        
        if(localStorage.getItem("isLocated")!=null){
          if(localStorage.getItem("isLocated") == true){
            common.isLocated = true;
          }
        }
       
    if(common.isLogin){
    $scope.index.login = true;
    $scope.index.logout = false;
  }
    else{
      $scope.index.login = false;
      $scope.index.logout = true;
    }

    $scope.logout = ()=>{
      common.isLogin = false;
      common.isStore = false;
      // localStorage.clear();
      localStorage.setItem("isLogin",common.isLogin);
      localStorage.setItem("storeLogin",common.isLogin);
      localStorage.removeItem("token");
      localStorage.removeItem("store_token");
      // localStorage.removeItem()
      // $window.location.reload();
      
    }
  });

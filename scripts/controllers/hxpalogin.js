'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:HxpaloginCtrl
 * @description
 * # HxpaloginCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('HxpaloginCtrl', function ($scope,$rootScope,hxpalogin,$window,common) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.message = "";
    if(common.isLogin === true){
    $window.location.assign("#login");
  } 
  if(common.isStore ===true){
    $window.location.assign("#dashboard");
  }
    var obj = {};
    $scope.hxpaloginfunc = ()=>{
        
        obj.username = $scope.email;
        obj.password = $scope.password;
        console.log(obj)
       
          var promise = hxpalogin.callserver(obj);
          promise.then((data)=>{
                console.log(data);
                localStorage.setItem("store_token",data.data.key);
                common.isStore = true;
                localStorage.setItem("storeLogin",common.isStore);
                $window.location.assign("#dashboard");
                //$window.location.reload();

			},(err)=>{
				$scope.message = "Wrong Email or Password!"
			})
       
    }
  });

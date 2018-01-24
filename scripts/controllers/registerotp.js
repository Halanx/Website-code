'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:RegisterotpCtrl
 * @description
 * # RegisterotpCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('RegisterotpCtrl', function ($scope,registerotp,$window,common) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
     
    $scope.submitform = ()=>{
    
        var obj = {};
        var firstname= localStorage.getItem('FirstName');
        obj.FirstName =firstname;
        var lastname=localStorage.getItem('LastName');
        obj.LastName=lastname;
        var phoneno= localStorage.getItem('PhoneNo');
        obj.PhoneNo= phoneno;
        var email=localStorage.getItem('email');
        obj.email=email;
        var password=localStorage.getItem('password');
        obj.password=password;
        obj.otp= parseInt($scope.otp);
        obj.username= "c" + phoneno;
        
         
        console.log(obj)
       
          var promise = registerotp.callserver(obj);
          promise.then((data)=>{
                 
                console.log(data.key);
                 var key = data.key;
                 localStorage.setItem("token",key);
                 common.isLogin=true;
                 localStorage.setItem("isLogin",common.isLogin);

                   // $window.location.href = "https://www.halanx.com/halanx-final/new1big-kfc/frontpage/login.html";
                  $window.location.assign("#landing");
            },(err)=>{
                
                alert("error");
            })
       
    }
  });

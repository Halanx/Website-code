'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:SocialregisterCtrl
 * @description
 * # SocialregisterCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('SocialregisterCtrl', function ($scope,socialregister,common,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.otpform = true;
    $scope.otperror = false;
    
    $scope.submitForm = ()=>{
       let otpObj = {"FirstName":localStorage.getItem("FirstName")};    
       let promise = socialregister.callserver(otpObj,$scope.PhoneNo);
       
       promise.then((data)=>{
         localStorage.setItem("PhoneNo",$scope.PhoneNo); 
         localStorage.setItem("email",$scope.email);
          console.log(data);
          $scope.otpform = false;
       },(err)=>{
         console.log(err);
       });   
    };

    $scope.submitForm1 = ()=>{
      let OTPobj = {
        "PhoneNo": localStorage.getItem("PhoneNo"),
        "otp":parseInt($scope.otp)
      };
      console.log(OTPobj.PhoneNo);
      console.log(OTPobj.otp);
      let key = localStorage.getItem("token");
      let promise1 = socialregister.callserver1(OTPobj,key);
      promise1.then((data)=>{
          console.log(data);
          common.isLogin=true;
          localStorage.setItem("isLogin",common.isLogin);
          $window.location.assign("#landing");
       },(err)=>{
         console.log(err);
          $scope.otperror = true;
       }); 
    };

    

  });

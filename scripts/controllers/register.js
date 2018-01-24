'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('RegisterCtrl', function ($scope,register,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    if(localStorage.getItem("isLogin") ==true){
     $window.location.href = "#landing";
    }
    $scope.firstnameError = false;
    $scope.lastnameError = false;
    $scope.emailError = false;
    $scope.passwordError = false;
    $scope.mobileError = false;

    $scope.firstname = "";
    $scope.lastname = "";
    $scope.email = "";
    $scope.password = "";
    $scope.mobilenumber = "";
    
    $scope.registerVerify = ()=> {
      if($scope.firstname.length==0) {
        $scope.firstnameError = true;
      } else {
        $scope.firstnameError = false;
      }
      if($scope.lastname.length==0) {
       $scope.lastnameError = true;
     }else {
      $scope.lastnameError = false;
    }
     if($scope.mobilenumber.length!=10) {
       $scope.mobileError = true;
     }else {
      $scope.mobileError = false;
    }
     if($scope.password.length==0) {
       $scope.passwordError = true;
     }else {
      $scope.passwordError = false;
    }
     if($scope.email.length==0) {
       $scope.emailError = true;
     }else {
      $scope.emailError = false;
    }
    }

    $scope.submitform = ()=>{
      $scope.registerVerify();

        if($scope.firstname.length!=0 && $scope.lastname.length!=0 && $scope.email.length!=0 && $scope.password.length!=0 && $scope.mobilenumber.length==10) {
        var obj = {};
        console.log(localStorage.FirstName);
        obj.FirstName = $scope.firstname;
        obj.PhoneNo=$scope.mobilenumber;
        
        var FirstName= $scope.firstname;
        localStorage.setItem('FirstName',FirstName);
        var LastName= $scope.lastname;
        localStorage.setItem('LastName',LastName);
        var PhoneNo= $scope.mobilenumber;
        localStorage.setItem('PhoneNo',PhoneNo);
        var email=$scope.email;
        localStorage.setItem('email',email);
        var password=$scope.password;
        localStorage.setItem('password',password);


         
        console.log(obj)
        
          var promise = register.callserver(obj);
          promise.then((data)=>
          {
          console.log(data);
          // $window.location.href="http://localhost/test2/halanx-final/new1big-kfc/frontpage/registerotp.html";
          $window.location.assign("#registerotp")
                   

                 
        
           
          },(err)=>{
            $scope.registerError = true;
          })
       
    }
  }
  });

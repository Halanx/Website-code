'use strict';

 
angular.module('halanxApp')
  .controller('ForgetpassCtrl', function ($scope,forgetpass) {
       
    $scope.submitform = ()=>{
    
        var obj = {};
        
        obj.FirstName=$scope.firstname;
        obj.username =$scope.mobilenumber;
        
         
        console.log(obj)
    
       
          var promise = forgetpass.callserver(obj);
          promise.then((data)=>
          {
          console.log(data);
          if(data.key){
              $window.location.href="#/forgetpassotp";
          }
          },(err)=>{
          alert("error");
          })
       
    }
  });

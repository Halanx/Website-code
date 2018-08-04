'use strict';
 
angular.module('halanxApp')
  .controller('ForgetpassotpCtrl', function ($scope,forgetpassotp) {
      
    $scope.submitform = ()=>{
    
        var obj = {};
        
        obj.username= "c"+ $scope.mobilenumber;
        obj.password= $scope.otp;
         
        
         
        console.log(obj)
       
          var promise = forgetpassotp.callserver(obj);
          promise.then((data)=>
          {
          console.log(data);
           var key=localStorage.getItem("key");
          if(data.key){
              $window.location.href="#/forgotpassnew.html";

          }
          },(err)=>{
          alert("error");
          })
       
    }
  });

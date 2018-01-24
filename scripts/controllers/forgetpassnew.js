'use strict';

 
angular.module('halanxApp')
  .controller('ForgetpassnewCtrl', function ($scope,forgetpassnew) {
        $scope.submitform = ()=>{
    
        var obj = {};
        
        obj.new_password1=$scope.newpass;
        obj.new_password2= $scope.cpass;
        
         
        console.log(obj)
        var key=localStorage.getItem("key1");
          var promise = forgetpassnew.callserver(obj,key);
          promise.then((data)=>
          {
          console.log(data);
          if(data.key){
              alert("Password Reset!");
          }
          },(err)=>{
          alert("error");
          })
       
    }
  });

'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:HxpaaboutCtrl
 * @description
 * # HxpaaboutCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('HxpaaboutCtrl', function ($scope,$rootScope,$window,hxpaabout) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var obj1 = {};
     var store_id = localStorage.getItem("store_id");
     $scope.$watch(function(){return JSON.parse(localStorage.storeLocation).Latitude}, function (newValue, oldValue) {
         
           if(oldValue != newValue){
              obj1.Latitude = JSON.parse(localStorage.storeLocation).Latitude;
              obj1.Longitude = JSON.parse(localStorage.storeLocation).Longitude;
    
             
           }
           
          
        }, true);


    obj1.Latitude = JSON.parse(localStorage.storeLocation).Latitude;
    obj1.Longitude = JSON.parse(localStorage.storeLocation).Longitude;
    
    console.log(localStorage.getItem("store_token"));
    // var obj = localStorage.getItem("store_token")
    let token = localStorage.getItem("store_token");
    $scope.submitaboutform = ()=>{
    
        
        obj1.CompanyLegalName = $scope.CompanyLegalName;
        obj1.PANNumber = $scope.PANNumber;
        
         
        console.log(obj1)
       if(token!=undefined || store_id!=undefined){
          var promise = hxpaabout.callserver(obj1,token,store_id);
          promise.then((data)=>{
                console.log(data);
                 $window.location.assign("#hxpabank");
                    $window.location.reload();
			},(err)=>{
				console.log("error");
			})
       }
    }
    $scope.submitbankform = ()=>{
      console.log("inside this");
          
            var token = localStorage.getItem("store_token");
            console.log(token);

            var obj = {};
            obj.BankAccountNumber = $scope.BankAccountNumber;
            obj.BankAccountType = $scope.BankAccountType;
            obj.IFSCCode = $scope.IFSCCode;
            obj.BankBranchAddress = $scope.BankBranchAddress;
            obj.BankBranch = $scope.BankBranch;
            obj.BankName = $scope.BankName;
            
            console.log(obj)
           
              var promise = hxpaabout.callserver(obj,token,store_id);
              promise.then((data)=>{

                    console.log(data);
                    $window.location.assign("#hxpatiming");
                   
                },(err)=>{
                    console.log("error");
                })
        
    };

    function returnTime(a){

    let date = new Date(a);
    return date.toLocaleTimeString();

} 

        $scope.submittimeform = ()=>{
            
                var obj2 = {};
                obj2 = {
                  'MondayOpeningTime': returnTime($scope.MondayOpeningTime),
                  'TuesdayOpeningTime': returnTime($scope.TuesdayOpeningTime),
                  'WednesdayOpeningTime': returnTime($scope.WednesdayOpeningTime),
                  'ThursdayOpeningTime': returnTime($scope.ThursdayOpeningTime),
                  'FridayOpeningTime': returnTime($scope.FridayOpeningTime),
                  'SaturdayOpeningTime': returnTime($scope.SaturdayOpeningTime),
                  'SundayOpeningTime':returnTime($scope.SundayOpeningTime),
                  'MondayClosingTime': returnTime($scope.MondayClosingTime),
                  'TuesdayClosingTime': returnTime($scope.TuesdayClosingTime),
                  'WednesdayClosingTime': returnTime($scope.WednesdayClosingTime),
                  'ThursdayClosingTime': returnTime($scope.ThursdayClosingTime),
                  'FridayClosingTime': returnTime($scope.FridayClosingTime),
                  'SaturdayClosingTime': returnTime($scope.SaturdayClosingTime),
                  'SundayClosingTime': returnTime($scope.SundayClosingTime)
                }

                console.log(obj2)
               
                  var promise = hxpaabout.callserver(obj2,token,store_id);
                  promise.then((data)=>{
                        console.log(data);
                        $window.location.assign("#dashboard");
                    },(err)=>{
                        console.log("error");
                    })
               
            }
    
  });

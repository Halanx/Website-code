'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:BusinessCtrl
 * @description
 * # BusinessCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('BusinessCtrl', function ($scope,$rootScope,$window,business) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.time = false;
    $scope.hxpadata = [];
    $scope.editTime = true;
    var sid;
    // var sid = localStorage.getItem("store_id");
    var token = localStorage.getItem("store_token");
        getStore();
       function getStore(){
          var promise = business.callBusiness(token);
          promise.then((data)=>{
                 
                  
                  sid = data[0].id;
                  console.log("sid is",data[0].id);
                  localStorage.setItem("store_id",sid);
                  if(sid){
                   showData(sid);
                  }
                
              },(err)=>{
                  console.log("error");
              })
        
        }
         $scope.myAccount1 = false;
         $scope.myAccount = true;
        function showData (sid1){
            
            
            if(sid1){
            console.log(token);
            var promise = business.getdata(token,sid1);
            promise.then((data)=>{
                  console.log("aay yah pe");
                  console.log(data);
                  $scope.hxpadata = data.data;
                //   $scope.myAccount = 
                  localStorage.setItem("lat_store",data.data.Latitude);
                  localStorage.setItem("lon_store",data.data.Longitude);
              },(err)=>{
                  console.log("error");
              })
        }
        }
    
        

    var obj1 = {};

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
    // let token = localStorage.getItem("store_token");
    $scope.submitaboutform = ()=>{
    
        
        obj1.CompanyLegalName = $scope.hxpadata.CompanyLegalName;
        obj1.PANNumber = $scope.hxpadata.PANNumber;
        
         
        console.log(obj1)
       
          var promise = business.callserver(obj1,token,sid);
          promise.then((data)=>{
                console.log(data);
                //  $window.location.assign("#hxpabank");
                    $window.location.reload();
			},(err)=>{
				console.log("error");
			})
       
    }

    $scope.submitbankform = ()=>{
          // if(localStorage.token){
            // var token = localStorage.getItem("store_token");
            console.log(token);

            var obj = {};
            obj.BankAccountNumber = $scope.hxpadata.BankAccountNumber;
            obj.BankAccountType = $scope.hxpadata.BankAccountType;
            obj.IFSCCode = $scope.hxpadata.IFSCCode;
            obj.BankBranchAddress = $scope.hxpadata.BankBranchAddress;
            obj.BankBranch = $scope.hxpadata.BankBranch;
            obj.BankName = $scope.hxpadata.BankName;
             
            console.log(obj)
           
              var promise = business.callserver(obj, token,sid);
              promise.then((data)=>{

                    console.log(data);
                    // $window.location.assign("#dashboard");
                   
                },(err)=>{
                    console.log("error");
                })
        // }
    }
    function returnTime(a){

    let date = new Date(a);
    if(date.toLocaleTimeString() == "Invalid Date"){
        return "";
    }
    return date.toLocaleTimeString();

} 

    $scope.AccountType = (val)=>{
        $scope.hxpadata.BankAccountType = val;
    }

    

    $scope.submittimeform = ()=>{
      
          var obj2 = {};
           var data_transfer = [
              {
                  "id":$scope.hxpadata.opening_hours[0].id,
                  "weekday":"Monday",
                  "from_hour":returnTime($scope.hxpadata.MondayOpeningTime),
                  "to_hour":returnTime($scope.hxpadata.MondayClosingTime),
                  "store":sid
              },
              {
                  "id":$scope.hxpadata.opening_hours[1].id,
                  "weekday":"Tuesday",
                  "from_hour":returnTime($scope.hxpadata.TuesdayOpeningTime),
                  "to_hour":returnTime($scope.hxpadata.TuesdayClosingTime), 
                  "store":sid
              },
              {
                  "id":$scope.hxpadata.opening_hours[2].id,
                  "weekday":"Wednesday",
                  "from_hour":returnTime($scope.hxpadata.WednesdayOpeningTime),
                  "to_hour":returnTime($scope.hxpadata.WednesdayClosingTime),
                   "store":sid
              },
              {
                  "id":$scope.hxpadata.opening_hours[3].id,
                  "weekday":"Thursday",
                  "from_hour":returnTime($scope.hxpadata.ThursdayOpeningTime),
                  "to_hour":returnTime($scope.hxpadata.ThursdayClosingTime),
                   "store":sid
              },
              {
                  "id":$scope.hxpadata.opening_hours[4].id,
                  "weekday":"Friday",
                  "from_hour":returnTime($scope.hxpadata.FridayOpeningTime),
                  "to_hour":returnTime($scope.hxpadata.FridayClosingTime),
                   "store":sid
              },
              {
                  "id":$scope.hxpadata.opening_hours[5].id,
                  "weekday":"Saturday",
                  "from_hour":returnTime($scope.hxpadata.SaturdayOpeningTime),
                  "to_hour":returnTime($scope.hxpadata.SaturdayClosingTime),
                   "store":sid
              },
              {
                  "id":$scope.hxpadata.opening_hours[6].id,
                  "weekday":"Sunday",
                  "from_hour":returnTime($scope.hxpadata.SundayOpeningTime),
                  "to_hour":returnTime($scope.hxpadata.SundayClosingTime),
                   "store":sid
              },
              
          ]
        //   obj2 = {
        //     'MondayOpeningTime': returnTime($scope.hxpadata.MondayOpeningTime),
        //     'TuesdayOpeningTime': returnTime($scope.hxpadata.TuesdayOpeningTime),
        //     'WednesdayOpeningTime': returnTime($scope.hxpadata.WednesdayOpeningTime),
        //     'ThursdayOpeningTime': returnTime($scope.hxpadata.ThursdayOpeningTime),
        //     'FridayOpeningTime': returnTime($scope.hxpadata.FridayOpeningTime),
        //     'SaturdayOpeningTime': returnTime($scope.hxpadata.SaturdayOpeningTime),
        //     'SundayOpeningTime': returnTime($scope.hxpadata.SundayOpeningTime),
        //     'MondayClosingTime': returnTime($scope.hxpadata.MondayClosingTime),
        //     'TuesdayClosingTime': returnTime($scope.hxpadata.TuesdayClosingTime),
        //     'WednesdayClosingTime': returnTime($scope.hxpadata.WednesdayClosingTime),
        //     'ThursdayClosingTime': returnTime($scope.hxpadata.ThursdayClosingTime),
        //     'FridayClosingTime': returnTime($scope.hxpadata.FridayClosingTime),
        //     'SaturdayClosingTime': returnTime($scope.hxpadata.SaturdayClosingTime),
        //     'SundayClosingTime': returnTime($scope.hxpadata.SundayClosingTime)
        //   }

          console.log(obj2)
          
            var promise = business.dateTime(data_transfer,token);
            promise.then((data)=>{
                if(data.result=="update successful"){
                    $window.location.reload();
                }
                  console.log(data);
              },(err)=>{
                  $scope.time = false;
            $scope.editTime = true;
              })
         
      }

      $scope.submitform = ()=>{
        
            var obj4 = {
              "FirstName" : $scope.hxpadata.Dealer_FirstName,
              "LastName" : $scope.hxpadata.Dealer_LastName,
              "email" : $scope.hxpadata.Dealer_EmailId,
              "password" : $scope.hxpadata.Dealer_password,
              "dealer-designation" : $scope.hxpadata.Dealer_Designation,
              "dealer-contact-number" : $scope.hxpadata.Dealer_ContactNo
            };
             
            console.log(obj4);
           
              var promise = business.callserver(obj4,token,sid);
              promise.then((data)=>{
                    console.log(data);
          },(err)=>{
            console.log("error");
          })
           
        }

        $scope.edit = ()=>{
            $scope.time = true;
            $scope.editTime = false;
        }

  });

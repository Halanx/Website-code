'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:DatepickerCtrl
 * @description
 * # DatepickerCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('DatepickerCtrl', function ($scope,datepicker,$window) {
       if(localStorage.getItem("isLogin") === null || JSON.parse(localStorage.getItem("isLogin"))==false){
     $window.location.href = "#login";
    }

    function todayDate(){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 
    var today = yyyy+"-"+mm+"-"+dd;
    localStorage.setItem("DeliveryDate",today);
    console.log(today);
	
}

         autocall();
         todayDate();
         $scope.dateError = false;
        function autocall(){
            $scope.desired = datepicker.desired();
            $scope.time = datepicker.time();
            $scope.mytime = true;
        }
       $scope.changeschedule = (i)=>{
           console.log(i.service);
            datepicker.check($scope.desired)
            if(i.service=="schedule for later"){
                $scope.mytime = false;  
            }
           else{
            $scope.mytime = true;   
           }
           i.mark = !i.mark;
       }
             $scope.timeadded=(i)=>{
           console.log("hello")
//           check($scope.time)
             datepicker.check($scope.time)
           i.mark = !i.mark
          
       }
             $scope.postdata = ()=>{
                $scope.dateError = false;
                 
     var date = $("#hw_datepicker").val()
//                 var obj = {};
       var DeliveryDate =date
       if(DeliveryDate!=""&&DeliveryDate!=null){
                   localStorage.setItem('DeliveryDate',DeliveryDate)
//                 console.log(obj.date)}
       }
                  var data= datepicker.gettrue($scope.desired)
                 if(date=="" && data.service=="schedule for later"){
                     $scope.dateError = "true";
                 }
               
                 else if(data.service=="schedule for later"){
//                 obj.schedule = data.service;
                     var time =  datepicker.gettrue($scope.time)
                     var StartTime=time.timing
                      localStorage.setItem('StartTime',StartTime)
                      localStorage.setItem('AsSoonAsPossible',false);
        
//                  console.log( obj.schedule)
                $window.location.reload();  
                 $window.location.href = "#location";
                  }
                 else{
                     
                     var AsSoonAsPossible = "true";
                      localStorage.setItem('AsSoonAsPossible',AsSoonAsPossible);
                      localStorage.setItem('StartTime',"null");
                    var StartTime=  new Date(new Date().getTime()).toLocaleTimeString();
                     
                      localStorage.setItem('StartTime',StartTime)
                //    $window.location.href = "https://www.halanx.com/halanx-final/new1big-kfc/Maps-master/cart.html"
                         $window.location.reload();  
                        $window.location.href = "#location";
             }
             }

  });

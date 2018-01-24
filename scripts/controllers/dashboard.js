'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('DashboardCtrl', function ($scope,dashboard,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var token = localStorage.getItem("store_token");
    var promise = dashboard.DashCall(token);

    $scope.dashdata = [];
    $scope.payment = [];
    promise.then(function(data){
      console.log(data);
      $scope.paid = data.data.paid;
      $scope.pending = data.data.pending;
      localStorage.setItem("paid_amount",data.data.paid);
      localStorage.setItem("pending_amount",data.data.pending);
      for(var i=0;i<data.data.items.length;i++){
        data.data.items[i].placing_time = getDate(data.data.items[i].placing_time)+" & "+formatAMPM(data.data.items[i].placing_time);
        data.data.items[i].dt = getDate(data.data.items[i].delivery_time)+" & "+formatAMPM(data.data.items[i].delivery_time);
      }
      $scope.dashdata = data.data.items;

      
      console.log("data is:",data.data.items);
    },function(err){
      console.log(err);
    })
// DashCall
    $scope.visit = ()=>{
      $window.location.assign("#business");
      $window.location.reload();
    }

    function formatAMPM(data) {
      var date = new Date(data);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }

    function getDate(data){
      var date = new Date(data);
      var day = date.getDate(); //Date of the month: 2 in our example
      var month = date.getMonth()+1; //Month of the Year: 0-based index, so 1 in our example
      var year = date.getFullYear();
      if(month<10){
        month = "0"+month;
      }
      return day+"/"+month+"/"+year;
    }

    $scope.openMe = ()=>{
      dashboard.PaymentCall(token).then((data)=>{
        for(var i=0;i<data.data.length;i++){
          var ele = getDate(data.data[i].paid_on)+" & "+formatAMPM(data.data[i].paid_on);
          data.data[i].paid_on = ele;
        }
        $scope.payment = data.data;
        console.log(data.data);
        
      })
      // for(var i=0;i<20;i++){
      // $scope.payment.push({id: i, amount: 1000*i, paid_on: "2018-01-11T12:30:00Z", store: 78});
      // }
    }
  });

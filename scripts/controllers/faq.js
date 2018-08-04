'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:FaqCtrl
 * @description
 * # FaqCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('FaqCtrl', function ($scope,faq) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    onLoad();
    $scope.showMe = true;
     $scope.states1= "";
    function onLoad(){
     var promise =  faq.getCategory();
     promise.then((data)=>{
       $scope.categories = data;
       console.log(data);
     })
    };

    $scope.showTopic = (slug,id)=>{
      // console.log($scope.states1);
      $scope.states1 = id;
      $scope.slug = slug;
      var promise = faq.getTopic(slug);
      promise.then((data)=>{
        
        $scope.topic = data;
        console.log(data);
      })
    }

    // $scope.showAnswer = (slug1)=>{
    //   var promise = faq.getQuestion($scope.slug,slug1);
    //   promise.then((data)=>{
    //     $scope.showMe = true;
    //     $scope.hideMe = false;
    //     console.log(data);
    //     $scope.answer = data;
    //   })
    // }

  });

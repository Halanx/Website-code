'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:AddedMoneyCtrl
 * @description
 * Controller of the halanxApp
 */
angular.module('halanxApp')
    .controller('AddedMoneyCtrl', function ($scope, $routeParams, payment) {
        var token = localStorage.getItem("store_token");
        $scope.messsage = "";
        console.log($routeParams);
        if ($routeParams.transaction_id && $routeParams.amount) {
            $scope.success = true;
            payment.addMoneyStore({
                payment_gateway: "payu",
                transaction_id: $routeParams.transaction_id,
                amount: $routeParams.amount,
                note: ""
            }, token)
                .then(
                    function (data) {
                        console.log(data.data);
                        $scope.message = `INR ${$routeParams.amount} added successfully!`;
                    },
                    function (error) {
                        $scope.error = error;
                        console.log("ERROR");
                    }
                );
        }
        else {
            $scope.success = false;
        }
    });
'use strict';

/**
 * @ngdoc function
 * @name winwinsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the winwinsApp
 */
angular.module('winwinsApp')
  .controller('SignUpCtrl', function ($scope) {
    $scope.signupForm = function(){
    	console.log("submit");
    }
  });

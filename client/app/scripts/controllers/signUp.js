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

  	$scope.form = {
  		firstName: '',
  		lastName: '',
		day: '',
		month: '',
		year: '',
  		mail: '',
  		password: '',
  		rpassword: ''
  	}

  	$scope.signupForm = function(){
    	console.log("submit");
    }

    $scope.signupForm = function(){
    	console.log("submit");
    }
  });

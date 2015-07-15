'use strict';

/**
 * @ngdoc function
 * @name winwinsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the winwinsApp
 */
angular.module('winwinsApp')
  .controller('CreateWWCtrl', function ($scope) {

  	$scope.region = "";
  	$scope.category = "";

  	$scope.selectRegion = function(region){
  		$scope.region = region;
  	}

  	$scope.selectCategory = function(category){
  		$scope.category = category;
  	}

  });

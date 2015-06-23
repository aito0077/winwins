'use strict';

/**
 * @ngdoc function
 * @name winwinsApp.controller:WinwinCtrl
 * @description
 * # WinwinCtrl
 * Controller of the winwinsApp
 */
angular.module('winwinsApp')
  .controller('WinwinCtrl', function ($scope) {

    $scope.waypoints = {};

  	var d = new Date();
  	$scope.mock = {
  		days: "100",
  		hours: d.getHours(),
  		minutes: d.getMinutes(),
  		suscribed: Math.floor( 10000*Math.random() ),
  		missing: Math.floor( 10000*Math.random() )
  	};

    $scope.backImg = "https://mehranbanaei.files.wordpress.com/2014/12/children-in-central-african-republic.jpg"
    $scope.howMany = 1500;
    $scope.details = "para hacer donaciones a los niños de África, y cambiar el destino de personas que necesitan comida, ropa, cariño y un monton de otras cosas";
  });

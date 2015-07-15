'use strict';

angular.module('winwinsApp')
	.directive('searchBar', ['$animate',function($animate){
		return {
			restrict: 'E',
			replace: true,
			scope: {
        	},
			templateUrl: 'partials/searchBar.html',
			link: function(scope, element, attrs){
				scope.searchActive = false;

				scope.toggleSearchBar = function(){
			  		scope.searchActive = !scope.searchActive;
			  		if (scope.searchActive){
			  			console.log("active");
			  		}else{
			  			console.log("inactive");
			  		}
			  	};
				
				return {};
			}
		};
	}]);
'use strict';

angular.module('winwinsApp')
	.directive('searchBar', ['$animate', '$state', function($animate, $state){
		return {
			restrict: 'E',
            replace: true,
			scope: {
        	},
			templateUrl: 'views/extras/searchBar.html',

            link: function(scope, element, attrs, ngModelCtrl) {

				scope.searchActive = false;

				scope.toggleSearchBar = function(){
			  		scope.searchActive = !scope.searchActive;
			  		if (scope.searchActive){

			  		}else{

			  		}
			  	};
				
                scope.search = function() {
                    console.dir($('#query').val());
                    $state.go('search-list', {
                        query: $('#query').val(),
                        winwin: $('#search_winwin').val(),
                        user: $('#search_user').val(),
                        group: $('#search_group').val(),
                        sponsor: $('#search_sponsor').val()
                    }); 
                };

			}
		};
	}]);

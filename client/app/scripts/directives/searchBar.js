'use strict';

angular.module('winwinsApp')
	.directive('searchBar', ['$animate', '$state', function($animate, $state){
		return {
			restrict: 'E',
			replace: true,
			scope: {
        	},
			templateUrl: 'views/extras/searchBar.html',
			link: function(scope, element, attrs){
				scope.searchActive = false;
                scope.search_sponsors = false;
                scope.search_users = false;
                scope.search_groups = false;
                scope.search_winwins = false;
                scope.term = '';

				scope.toggleSearchBar = function(){
			  		scope.searchActive = !scope.searchActive;
			  		if (scope.searchActive){

			  		}else{

			  		}
			  	};
				
                scope.search = function() {
                    console.dir(scope);
                    $state.go('search-list', {
                        query: scope.term,
                        winwin: scope.search_winwins,
                        user: scope.search_users,
                        group: scope.search_groups,
                        sponsor: scope.search_sponsors
                    }); 
                };

				return {};
			}
		};
	}]);

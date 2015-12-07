angular.module('winwinsApp')
.directive('ngTranslateLanguageSelect', function (LocaleService) { 'use strict';
    return {
        restrict: 'A',
        replace: true,
        template: ''+
        '<div class="dropdown language-select" ng-if="visible">'+
            '<select ng-model="currentLocaleDisplayName"'+
                'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'+
                'ng-change="changeLanguage(currentLocaleDisplayName)">'+
            '</select>'+
        '</div>'+
        '',
        controller: function ($scope) {
            $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
            $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
            $scope.visible = $scope.localesDisplayNames &&
            $scope.localesDisplayNames.length > 1;

            $scope.changeLanguage = function (locale) {
                LocaleService.setLocaleByDisplayName(locale);
            };
        }
    };
});

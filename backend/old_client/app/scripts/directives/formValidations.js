'use strict';

angular.module('winwinsApp')
.directive('ensureUnique', ['$http', function($http) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function() {
                //TODO
                /*$http({
                    method: 'POST',
                    url: '/api/check/' + attrs.ensureUnique,
                    data: {'field': attrs.ensureUnique}
                }).success(function(data, status, headers, cfg) {
                    c.$setValidity('unique', data.isUnique);
                }).error(function(data, status, headers, cfg) {
                    c.$setValidity('unique', false);
                });*/
            });
        }
    }
}])
.directive('compareTo', [function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
            
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
}])
;

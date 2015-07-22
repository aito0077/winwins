angular.module('birth-day', ['ng']).directive('birthDayPicker', function () {
    return {
        restrict: 'A',
        replace: true,
        required: 'birthday',
        scope: {
            birthday: "=",
            onChange: '&',
        },
        template: '<div class="birthday-picker input-group">'+
            '<input type="number" placeholder="Día" id="monthDay" ng-model="birthDay" min="1" max="31" max-lengh="2" ng-change="birthpickerchanged();" class="birth-day form-control col-xs-4 col-md-4 no-padding"/>' +
            '<select ng-model="birthMonth" ng-change="birthpickerchanged();" class="birth-month  form-control col-xs-4 col-md-4 no-padding">' +
                '<option value="1">Enero</option>' +
                '<option value="2">Febrero</option>' +
                '<option value="3">Marzo</option>' +
                '<option value="4">Abril</option>' +
                '<option value="5">Mayo</option>' +
                '<option value="6">Junio</option>' +
                '<option value="7">Julio</option>' +
                '<option value="8">Agosto</option>' +
                '<option value="9">Septiembre</option>' +
                '<option value="10">Octubre</option>' +
                '<option value="11">Noviembre</option>' +
                '<option value="12">Diciembre</option>' +
            '</select>' +
            '<input type="number" placeholder="Año" id="Year" ng-model="birthYear" min="1900" max-lengh="4"  max="{{maxyear();}}" ng-change="birthpickerchanged();" class="birth-year form-control col-xs-4 col-md-4 no-padding" name="birth"/>'+
            '</div>',
        link: function (scope, elm, attrs) {

            if (scope.birthday == null) {
                scope.birthMonth = new Date().getMonth();
                scope.birthDay = new Date().getDate();
                scope.birthYear = new Date().getFullYear();
            }
            else {
                var BirthDate = new Date(scope.birthday);

                scope.birthMonth = BirthDate.getMonth() + 1;
                scope.birthDay = BirthDate.getDate();
                scope.birthYear = BirthDate.getFullYear();
            }
            
            scope.birthpickerchanged = function () {
                if (scope.birthDay > 31) {
                    scope.birthDay = 31;
                } else if (scope.birthDay <= 0) {
                    scope.birthDay = 1;
                } else if (scope.birthDay == undefined) {
                    scope.birthDay = 31;
                }

                if (scope.birthDay > scope.maxyear()) {
                    scope.birthDay = scope.maxyear();
                } 
                var BirthDate = new Date(scope.birthYear, scope.birthMonth - 1, scope.birthDay, 0, 0, 0)
                scope.birthday = BirthDate;
                scope.onChange({ data: scope.birthday })
            }

            scope.maxyear = function () {
                return new Date().getFullYear();
            }
        }

    };
});

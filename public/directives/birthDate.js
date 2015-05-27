angular.module('birth-day', ['ng']).directive('birthDayPicker', function () {
    return {
        restrict: 'A',
        replace: true,
        required: 'birthday',
        scope: {
            birthday: "=",
            onChange: '&',
        },
        template: '<div class="birthday-picker">'+
            '<input type="number" placeholder="Day" id="monthDay" ng-model="birthDay" min="1" max="31" max-lengh="2" ng-change="birthpickerchanged();" class="birth-day"/>' +
            '<select ng-model="birthMonth" ng-change="birthpickerchanged();" class="birth-month">' +
                '<option value="1">Jan</option>' +
                '<option value="2">Feb</option>' +
                '<option value="3">Mar</option>' +
                '<option value="4">Apr</option>' +
                '<option value="5">May</option>' +
                '<option value="6">Jun</option>' +
                '<option value="7">Jul</option>' +
                '<option value="8">Aug</option>' +
                '<option value="9">Sep</option>' +
                '<option value="10">Oct</option>' +
                '<option value="11">Nov</option>' +
                '<option value="12">Dec</option>' +
            '</select>' +
            '<input type="number" placeholder="Year" id="Year" ng-model="birthYear" min="1900" max-lengh="4"  max="{{maxyear();}}" ng-change="birthpickerchanged();" class="birth-year" name="birth"/>'+
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

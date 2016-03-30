'use strict';

angular.module('winwinsApp')
.directive('closingDatePicker', [ '$window', '$templateCache', function ($window, $templateCache) {
    if(!$window.moment){
      console.log('moment.js is required for this datepicker, http://momentjs.com/');
      return {
        link: function(){}
      }; 
    }

    var fileName = 'datepicker.directive.html';
    var template = $templateCache.get(fileName);
  
    if(!template){
       /* 
      __template = [
        '<form name="datepicker">',
          '<div class="btn-group btn-group-justified" role="group">',
            '<div ng-repeat="i in localeOrder track by $index" class="btn-group" role="group">',
              '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">',
                '<span ng-bind="date[options[i].name] || options[i].name"> </span>',
                '<span class="caret"></span>',
              '</button>',
    
              '<ul class="dropdown-menu" role="menu">',
                '<li ng-repeat="(j, option) in options[i].options track by $index" ng-class="{\'selectedval\': option.selected === true, \'disabled\': option.disabled === true}">',
                  '<a ng-click="select(options[i].name, option)" ng-bind="options[i].labels[j] || option.value"></a>',
                '</li>',
              '</ul>',
    
            '</div>',
          '</div>',
        '</form>'
      ].join('');
        */
      template = [
        '<div ng-repeat="i in localeOrder track by $index"  class="dropdown col-xs-4 no-padding">',
            '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">',
                '<span ng-bind="date[options[i].name] || options[i].name"> </span>',
                '<span class="caret"></span>',
            '</button>',
            '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">',
                '<li ng-repeat="(j, option) in options[i].options track by $index">',
                  '<span style="cursor:pointer" ng-click="select(options[i].name, option)" ng-bind="options[i].labels[j] || option.value"></span>',
                '</li>',
            '</ul>',
        '</div>'
      ].join('');

      $templateCache.put(fileName, template);
    }
  
    return {
      restrict: 'A',
      //replace: true,
      require: 'ngModel',
      templateUrl: fileName,
      scope: {
        model: '=ngModel',
        minDate: '=minDate',
        maxDate: '=maxDate',
        locale: '=?locale'
      }, 
      link: function(scope, elem, attrs, ngModelCtrl){
        
        var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
        var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        scope.localeOrder = ['days', 'months', 'years'];
        
        
        // params object is the main object to be modified. It is iterated by ng-repeat in the dom. 
        var params = {
          days: {
            name: 'days',
            initLabel: 'Día',
            options: []
          },
          months: {
            name: 'months',
            initLabel: 'Mes',
            options: [],
          },
          years: {
            name: 'years',
            initLabel: 'Año',
            options: []
          }
        };
        
        
        // setting up exceptions because of minDate, maxDate; 
        var minDate;
        var maxDate;
        
        // setting minDate
        if(scope.minDate && scope.minDate !== 'now'){
          
          var tempMinDate; 
          
          if(typeof scope.minDate === 'number'){
            // assume this is something like -100 or +100; 
            if(scope.minDate > 0){
              tempMinDate = moment().add(scope.minDate, 'years');
            } else if (scope.minDate < 0)  {
              tempMinDate = moment().subtract(Math.abs(scope.minDate), 'years');
            } else {
              tempMinDate = moment();
            }
          } else {
            tempMinDate = moment(scope.minDate);
          }
          

          // setting it to minDate
          minDate = tempMinDate;
          
        } else {
          minDate = moment();
        }
        
        
        // setting maxDate. THIS IS NOT DRY, BUT A PASTE FROM SETTING minDate !
        if(scope.maxDate && scope.maxDate !== 'now'){
          
          var tempMaxDate; 
          
          if(typeof scope.maxDate === 'number'){
            // assume this is something like -100 or +100; 
            if(scope.maxDate > 0){
              tempMaxDate = moment().add(scope.maxDate, 'years');
            } else if (scope.maxDate < 0)  {
              tempMaxDate = moment().subtract(Math.abs(scope.maxDate), 'years');
            } else {
              tempMaxDate = moment();
            }
          } else {
            tempMaxDate = moment(scope.maxDate);
          }
          

          // setting it to maxDate
          maxDate = tempMaxDate;
          
        } else {
          maxDate = moment();
        }
        

        // copying scope.options, which is used in view.
        scope.options = angular.copy(params);
  
  
        // holder for date object, modified by scope.select(). Every change the method setupModel() is called, a new Date is created from this. 
        scope.date = {}; 


        // Select the value; 
        scope.select = function(typeString, option){
          
          if(option.disabled === undefined || option.disabled !== true){
            scope.date[typeString] = option.value;
            calcAvailableDates(scope.date);
            setupModel();
          }
        };


        // recreate scope.options based on params and date input;
        function calcAvailableDates(dateObj){
          
          
          
          var maxYear  = maxDate.get('years')
          var minYear  = minDate.get('years');
          var maxMonth  = maxDate.get('month');
          var minMonth  = minDate.get('month');
          var maxDay    = maxDate.get('date');
          var minDay    = minDate.get('date');
          
          // CALCULATE YEARS
          if(minDate !== maxDate){
            
            scope.options.years.options = [];
            for (var i = minYear; i <= maxYear ; i++) {
              
              var yearObj = {
                value: i,
                available: true
              };
              
              if(dateObj && dateObj.years === i){
                yearObj.selected = true; 
              }
              
              scope.options.years.options.push(yearObj);
            }
            
          } else {
            // do something like assumptions, e.g. datepicker? 
          }
          
          
          // CALCULATE MONTHS
          if(minDate !== maxDate){
            
            scope.options.months.options = [];
            
            for (var i = 0; i < months.length; i++) {
            
              var monthObj = {
                value: months[i]
              };
              
              if(dateObj && dateObj.months === months[i]){
                monthObj.selected = true; 
              }
              
              if(dateObj && dateObj.years){
                if(dateObj.years === minYear){
                  if(minMonth > i ){
                    monthObj.disabled = true;
                  }
                } else if (dateObj.years === maxYear){
                  if(maxMonth < i ){
                    monthObj.disabled = true;
                  }
                }
              }
              
              scope.options.months.options.push(monthObj);
            }
            
          } else {
            // do something like assumptions, e.g. datepicker? 
          }
          
          
          
          // CALCULATE DAYS
          if(minDate !== maxDate){
            scope.options.days.options = [];
            if((dateObj && dateObj.years && dateObj.months) || dateObj.months){
            
              var useYear; 
              if(dateObj.years){
                useYear = dateObj.years
              } else {
                useYear = moment().get('year');
              }
              
              var totalDaysMonth = moment({
                years: useYear,
                months: months.indexOf(dateObj.months)
              }).endOf('month').get('date');
              
              for (var i = 0; i < totalDaysMonth; i++) {
                
                var dayObj = {}
                dayObj.value = i + 1;
                
                if(dateObj && dateObj.days && dateObj.days === i + 1){
                  dayObj.selected = true;
                }
                

              // setting values disabled when they're mindate < or > maxDate

              if(dateObj.years && dateObj.months){
                if(dateObj.years === minYear && months.indexOf(dateObj.months) === minMonth){
                  
                  if(minDay > i){
                    dayObj.disabled = true;
                  }
                } else if (dateObj.years === maxYear && months.indexOf(dateObj.months) === maxMonth){
                  
                  if(maxDay < i){
                    dayObj.disabled = true;
                  }
                }
              }

                scope.options.days.options.push(dayObj);
                
              }
              
              
            } else {
              
              // only days available, just use 31 days. 
              scope.options.days.options = [];
              for (var i = 0; i < days.length; i++) {
                
                var dayObj = {}
                dayObj.value = i + 1;
                
                if(dateObj && dateObj.days && dateObj.days === i + 1){
                  dayObj.selected = true;
                }
                
                scope.options.days.options.push(dayObj);
              }
            }

          }
          
          
        }
        
      
  
        function setupModel(){
          
          // Not setting before all values are available. 
          if(scope.date.years !== undefined && scope.date.months !== undefined && scope.date.days !== undefined){
  
            var createDate = {
              years: scope.date.years, 
              months: months.indexOf(scope.date.months), 
              date: scope.date.days, 
            };
            
            createDate = moment.utc(createDate);
            ngModelCtrl.$setViewValue(createDate)
          }
        }
  

        // toView - what is transformed from model to view. 
        var toView = function(value){
          
          if(value !== undefined){
            var tempDate = moment(value);
            calcAvailableDates({
              years: tempDate.get('year'),
              months: months[tempDate.get('months')],
              days: tempDate.get('date') 
            });
          } else {
            calcAvailableDates();
          }
          

          if(value !== undefined){
            var createDate = moment(value);
            if(createDate.isValid()){
              
              var obj = {};
              obj.days = createDate.date();
              obj.months = months[createDate.month()]; 
              obj.years = createDate.year();
  
              scope.date = obj; 
  
            }
          } else {
            scope.date = {};
          }

          setupModel();
          
          return value; 

        };
  
  
        // toModel - what is transformed from view to model (called by ngModelCtrl.$setViewValue(createDate))
        // in setupModel()
        var toModel = function(value){
          
          if(value && value.isValid()){
            if((value.isAfter(minDate) || minDate.isSame(value)) && (maxDate.isAfter(value) || maxDate.isSame(value)) ){
              ngModelCtrl.$setValidity('not-allowed', true);
              return value.format(); 
            } else {
              ngModelCtrl.$setValidity('not-allowed', false);
              return undefined;
            }
          } else {
            return undefined;
          }

        };
  
        // Pushing functions to $parsers and $formatters.
        ngModelCtrl.$parsers.push(toModel);
        ngModelCtrl.$formatters.push(toView);
  
      }
    }
  
  }
]);

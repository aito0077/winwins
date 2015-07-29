!function(){"use strict";angular.module("app",["ngAnimate","ngAria","ngMaterial","ui.router","ui.bootstrap","easypiechart","ui.tree","ngMap","ngTagsInput","textAngular","angular-loading-bar","duScroll","app.nav","app.i18n","app.chart","app.ui","app.ui.form","app.ui.form.validation","app.ui.map","app.page","app.table"])}(),function(){"use strict";angular.module("app").config(["$stateProvider","$urlRouterProvider",function(a,b){var c,d;c=["dashboard","ui/cards","ui/typography","ui/buttons","ui/icons","ui/grids","ui/widgets","ui/components","ui/timeline","ui/lists","ui/pricing-tables","ui/maps","tables/static","tables/dynamic","tables/responsive","forms/elements","forms/layouts","forms/validation","forms/wizard","charts/charts","charts/flot","charts/chartjs","pages/404","pages/500","pages/blank","pages/forgot-password","pages/invoice","pages/lock-screen","pages/profile","pages/signin","pages/signup","app/calendar"],d=function(b){var c,d;return d="/"+b,c={url:d,templateUrl:"views/"+b+".html"},a.state(b,c),a},c.forEach(function(a){return d(a)}),b.when("/","/dashboard").otherwise("/dashboard")}])}(),function(){"use strict";function a(a,b,c,d){var e=new Date,f=e.getFullYear();a.main={brand:"Winwins",name:"Lisa",year:f},a.pageTransitionOpts=[{name:"Fade up","class":"animate-fade-up"},{name:"Scale up","class":"ainmate-scale-up"},{name:"Slide in from right","class":"ainmate-slide-in-right"},{name:"Flip Y","class":"animate-flip-y"}],a.admin={layout:"wide",menu:"vertical",fixedHeader:!0,fixedSidebar:!0,pageTransition:a.pageTransitionOpts[0],skin:"22"},a.$watch("admin",function(c,d){"horizontal"===c.menu&&"vertical"===d.menu&&b.$broadcast("nav:reset"),c.fixedHeader===!1&&c.fixedSidebar===!0&&(d.fixedHeader===!1&&d.fixedSidebar===!1&&(a.admin.fixedHeader=!0,a.admin.fixedSidebar=!0),d.fixedHeader===!0&&d.fixedSidebar===!0&&(a.admin.fixedHeader=!1,a.admin.fixedSidebar=!1)),c.fixedSidebar===!0&&(a.admin.fixedHeader=!0),c.fixedHeader===!1&&(a.admin.fixedSidebar=!1)},!0),a.color={primary:"#3F51B5",success:"#4CAF50",info:"#00BCD4",infoAlt:"#673AB7",warning:"#FFC107",danger:"#F44336",gray:"#DCDCDC"},b.$on("$stateChangeSuccess",function(a,b,c){d.scrollTo(0,0)})}function b(a){a.theme("default").primaryPalette("indigo",{"default":"500"}).accentPalette("cyan",{"default":"500"}).warnPalette("red",{"default":"500"}).backgroundPalette("grey")}angular.module("app").controller("AppCtrl",["$scope","$rootScope","$state","$document",a]).config(["$mdThemingProvider",b])}(),function(){function a(a){a.useStaticFilesLoader({prefix:"i18n/",suffix:".json"}),a.preferredLanguage("en")}function b(a,b){a.lang="Español",a.setLang=function(c){switch(c){case"English":b.use("en");break;case"Español":b.use("es");break;case"中文":b.use("zh");break;case"日本語":b.use("ja");break;case"Portugal":b.use("pt");break;case"Русский язык":b.use("ru")}return a.lang=c},a.getFlag=function(){var b;switch(b=a.lang){case"English":return"flags-american";case"Español":return"flags-spain";case"中文":return"flags-china";case"Portugal":return"flags-portugal";case"日本語":return"flags-japan";case"Русский язык":return"flags-russia"}}}angular.module("app.i18n",["pascalprecht.translate"]).config(["$translateProvider",a]).controller("LangCtrl",["$scope","$translate",b])}(),function(){"use strict";angular.module("app.chart",["chart.js"])}(),function(){"use strict";function a(a){a.easypiechartsm1={percent:63,options:{animate:{duration:1500,enabled:!1},barColor:a.color.success,lineCap:"round",size:120,lineWidth:5}},a.easypiechartsm2={percent:35,options:{animate:{duration:1500,enabled:!1},barColor:a.color.info,lineCap:"round",size:120,lineWidth:5}},a.easypiechartsm3={percent:75,options:{animate:{duration:1500,enabled:!1},barColor:a.color.warning,lineCap:"round",size:120,lineWidth:5}},a.easypiechartsm4={percent:66,options:{animate:{duration:1500,enabled:!1},barColor:a.color.danger,lineCap:"round",size:120,lineWidth:5}},a.easypiechart={percent:65,options:{animate:{duration:1e3,enabled:!0},barColor:a.color.primary,lineCap:"round",size:180,lineWidth:5}},a.easypiechart2={percent:35,options:{animate:{duration:1e3,enabled:!0},barColor:a.color.success,lineCap:"round",size:180,lineWidth:10}},a.easypiechart3={percent:68,options:{animate:{duration:1e3,enabled:!0},barColor:a.color.info,lineCap:"square",size:180,lineWidth:20,scaleLength:0}}}function b(a,b){Chart.defaults.global.tooltipCornerRadius=2,Chart.defaults.global.colours=[{fillColor:"rgba(63,81,181,0.3)",strokeColor:"rgba(63,81,181,1)",pointColor:"rgba(63,81,181,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(63,81,181,0.8)"},{fillColor:"rgba(187,187,187,0.3)",strokeColor:"rgba(187,187,187,1)",pointColor:"rgba(187,187,187,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(187,187,187,0.8)"},{fillColor:"rgba(76,175,80,0.3)",strokeColor:"rgba(76,175,80,1)",pointColor:"rgba(76,175,80,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(76,175,80,0.8)"},{fillColor:"rgba(244,67,54,0.3)",strokeColor:"rgba(244,67,54,1)",pointColor:"rgba(244,67,54,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(244,67,54,0.8)"},{fillColor:"rgba(255,193,7,0.3)",strokeColor:"rgba(255,193,7,1)",pointColor:"rgba(255,193,7,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(255,193,7,0.8)"},{fillColor:"rgba(77,83,96,0.3)",strokeColor:"rgba(77,83,96,1)",pointColor:"rgba(77,83,96,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(77,83,96,1)"}],a.bar={labels:["2009","2010","2011","2012","2013","2014"],series:["A","B"],data:[[59,40,61,26,55,40],[38,80,19,66,27,90]],options:{barValueSpacing:15}},a.line={labels:["January","February","March","April","May","June","July"],series:["A","B"],data:[[28,48,40,19,86,27,90],[65,55,75,55,65,50,55]],options:{}},a.radar={labels:["Eating","Drinking","Sleeping","Designing","Coding","Cycling","Running"],data:[[65,59,90,81,56,55,40],[28,48,40,19,96,27,100]]},a.polarArea={labels:["Download Sales","In-Store Sales","Mail-Order Sales","Tele Sales","Corporate Sales"],data:[300,500,100,40,120]},a.doughnut={labels:["Download Sales","In-Store Sales","Mail-Order Sales"],data:[300,500,100]},a.pie={labels:["Download Sales","In-Store Sales","Mail-Order Sales"],data:[300,500,100]}}function c(a){var b,c,d,e,f,g,h;f={},f.data1=[[1,15],[2,20],[3,14],[4,10],[5,10],[6,20],[7,28],[8,26],[9,22]],a.line1={},a.line1.data=[{data:f.data1,label:"Trend"}],a.line1.options={series:{lines:{show:!0,fill:!0,fillColor:{colors:[{opacity:0},{opacity:.3}]}},points:{show:!0,lineWidth:2,fill:!0,fillColor:"#ffffff",symbol:"circle",radius:5}},colors:[a.color.primary,a.color.infoAlt],tooltip:!0,tooltipOpts:{defaultTheme:!1},grid:{hoverable:!0,clickable:!0,tickColor:"#f9f9f9",borderWidth:1,borderColor:"#eeeeee"},xaxis:{ticks:[[1,"Jan."],[2,"Feb."],[3,"Mar."],[4,"Apr."],[5,"May"],[6,"June"],[7,"July"],[8,"Aug."],[9,"Sept."],[10,"Oct."],[11,"Nov."],[12,"Dec."]]}},b={},b.data1=[[2007,15],[2008,20],[2009,10],[2010,5],[2011,5],[2012,20],[2013,28]],b.data2=[[2007,15],[2008,16],[2009,22],[2010,14],[2011,12],[2012,19],[2013,22]],a.area={},a.area.data=[{data:b.data1,label:"Value A",lines:{fill:!0}},{data:b.data2,label:"Value B",points:{show:!0},yaxis:2}],a.area.options={series:{lines:{show:!0,fill:!1},points:{show:!0,lineWidth:2,fill:!0,fillColor:"#ffffff",symbol:"circle",radius:5},shadowSize:0},grid:{hoverable:!0,clickable:!0,tickColor:"#f9f9f9",borderWidth:1,borderColor:"#eeeeee"},colors:[a.color.success,a.color.danger],tooltip:!0,tooltipOpts:{defaultTheme:!1},xaxis:{mode:"time"},yaxes:[{},{position:"right"}]},d={},d.dataH1=[[40,1],[59,2],[50,3],[81,4],[56,5]],d.dataH2=[[28,1],[48,2],[90,3],[19,4],[45,5]],d.dataV1=[[1,28],[2,48],[3,90],[4,19],[5,45],[6,58]],d.dataV2=[[1,40],[2,59],[3,50],[4,81],[5,56],[6,49]],a.barChartCleanH={},a.barChartCleanH.data=[{label:" A",data:d.dataH1,bars:{order:0,fillColor:{colors:[{opacity:.3},{opacity:.3}]}}},{label:" B",data:d.dataH2,bars:{order:1,fillColor:{colors:[{opacity:.3},{opacity:.3}]}}}],a.barChartCleanH.options={series:{stack:!0,bars:{show:!0,fill:1,barWidth:.35,align:"center",horizontal:!0}},grid:{show:!0,aboveData:!1,color:"#eaeaea",hoverable:!0,borderWidth:1,borderColor:"#eaeaea"},tooltip:!0,tooltipOpts:{defaultTheme:!1},colors:[a.color.gray,a.color.primary,a.color.info,a.color.danger]},a.barChartCleanV={},a.barChartCleanV.data=[{label:" A",data:d.dataV1,bars:{order:0,fillColor:{colors:[{opacity:.3},{opacity:.3}]}}},{label:" B",data:d.dataV2,bars:{order:1,fillColor:{colors:[{opacity:.3},{opacity:.3}]}}}],a.barChartCleanV.options={series:{stack:!0,bars:{show:!0,fill:1,barWidth:.25,align:"center",horizontal:!1}},grid:{show:!0,aboveData:!1,color:"#eaeaea",hoverable:!0,borderWidth:1,borderColor:"#eaeaea"},tooltip:!0,tooltipOpts:{defaultTheme:!1},colors:[a.color.gray,a.color.primary,a.color.info,a.color.danger]},g=[[1,70],[2,55],[3,68],[4,81],[5,56],[6,55],[7,68],[8,45],[9,35]],h=[[1,28],[2,48],[3,30],[4,60],[5,100],[6,50],[7,10],[8,25],[9,50]],a.area1={},a.area1.data=[{label:" A",data:g,bars:{order:0,fillColor:{colors:[{opacity:.3},{opacity:.3}]},show:!0,fill:1,barWidth:.3,align:"center",horizontal:!1}},{data:h,curvedLines:{apply:!0},lines:{show:!0,fill:!0,fillColor:{colors:[{opacity:.2},{opacity:.2}]}}},{data:h,label:"D",points:{show:!0}}],a.area1.options={series:{curvedLines:{active:!0},points:{lineWidth:2,fill:!0,fillColor:"#ffffff",symbol:"circle",radius:4}},grid:{hoverable:!0,clickable:!0,tickColor:"#f9f9f9",borderWidth:1,borderColor:"#eeeeee"},tooltip:!0,tooltipOpts:{defaultTheme:!1},colors:[a.color.gray,a.color.primary,a.color.primary]},a.area2={},a.area2.data=[{data:g,curvedLines:{apply:!0},lines:{show:!0,fill:!0,fillColor:{colors:[{opacity:.2},{opacity:.2}]}}},{data:g,label:"C",points:{show:!0}},{data:h,curvedLines:{apply:!0},lines:{show:!0,fill:!0,fillColor:{colors:[{opacity:.2},{opacity:.2}]}}},{data:h,label:"D",points:{show:!0}}],a.area2.options={series:{curvedLines:{active:!0},points:{lineWidth:2,fill:!0,fillColor:"#ffffff",symbol:"circle",radius:4}},grid:{hoverable:!0,clickable:!0,tickColor:"#f9f9f9",borderWidth:1,borderColor:"#eeeeee"},tooltip:!0,tooltipOpts:{defaultTheme:!1},colors:[a.color.gray,a.color.gray,a.color.primary,a.color.primary]},c={},c.data1=[[2009,10],[2010,5],[2011,5],[2012,20],[2013,28]],c.data2=[[2009,22],[2010,14],[2011,12],[2012,19],[2013,22]],c.data3=[[2009,30],[2010,20],[2011,19],[2012,13],[2013,20]],a.barChartStacked={},a.barChartStacked.data=[{label:"Value A",data:c.data1},{label:"Value B",data:c.data2},{label:"Value C",data:c.data3}],a.barChartStacked.options={series:{stack:!0,bars:{show:!0,fill:1,barWidth:.3,align:"center",horizontal:!1,order:1}},grid:{hoverable:!0,borderWidth:1,borderColor:"#eeeeee"},tooltip:!0,tooltipOpts:{defaultTheme:!1},colors:[a.color.success,a.color.info,a.color.warning,a.color.danger]},a.barChartVertical={},a.barChartVertical.data=[{label:"Value A",data:c.data1,bars:{order:0}},{label:"Value B",data:c.data2,bars:{order:1}},{label:"Value C",data:c.data3,bars:{order:2}}],a.barChartVertical.options={series:{stack:!0,bars:{show:!0,fill:1,barWidth:.2,align:"center",horizontal:!1}},grid:{hoverable:!0,borderWidth:1,borderColor:"#eeeeee"},yaxis:{max:40},tooltip:!0,tooltipOpts:{defaultTheme:!1},colors:[a.color.success,a.color.info,a.color.warning,a.color.danger]},e={},e.data1=[[85,10],[50,20],[55,30]],e.data2=[[77,10],[60,20],[70,30]],e.data3=[[100,10],[70,20],[55,30]],a.barChartHorizontal={},a.barChartHorizontal.data=[{label:"Value A",data:e.data1,bars:{order:1}},{label:"Value B",data:e.data2,bars:{order:2}},{label:"Value C",data:e.data3,bars:{order:3}}],a.barChartHorizontal.options={series:{stack:!0,bars:{show:!0,fill:1,barWidth:1,align:"center",horizontal:!0}},grid:{hoverable:!0,borderWidth:1,borderColor:"#eeeeee"},tooltip:!0,tooltipOpts:{defaultTheme:!1},colors:[a.color.success,a.color.info,a.color.warning,a.color.danger]},a.pieChart={},a.pieChart.data=[{label:"Download Sales",data:12},{label:"In-Store Sales",data:30},{label:"Mail-Order Sales",data:20},{label:"Online Sales",data:19}],a.pieChart.options={series:{pie:{show:!0}},legend:{show:!0},grid:{hoverable:!0,clickable:!0},colors:[a.color.primary,a.color.success,a.color.info,a.color.warning,a.color.danger],tooltip:!0,tooltipOpts:{content:"%p.0%, %s",defaultTheme:!1}},a.donutChart={},a.donutChart.data=[{label:"Download Sales",data:12},{label:"In-Store Sales",data:30},{label:"Mail-Order Sales",data:20},{label:"Online Sales",data:19}],a.donutChart.options={series:{pie:{show:!0,innerRadius:.5}},legend:{show:!0},grid:{hoverable:!0,clickable:!0},colors:[a.color.primary,a.color.success,a.color.info,a.color.warning,a.color.danger],tooltip:!0,tooltipOpts:{content:"%p.0%, %s",defaultTheme:!1}},a.donutChartHarmony={},a.donutChartHarmony.data=[{label:"Download Sales",data:12},{label:"In-Store Sales",data:30},{label:"Mail-Order Sales",data:20},{label:"Online Sales",data:19},{label:"Direct Sales",data:15}],a.donutChartHarmony.options={series:{pie:{show:!0,innerRadius:.45}},legend:{show:!1},grid:{hoverable:!0,clickable:!0},colors:["#1BB7A0","#39B5B9","#52A3BB","#619CC4","#6D90C5"],tooltip:!0,tooltipOpts:{content:"%p.0%, %s",defaultTheme:!1}}}function d(a){a.demoData1={data:[3,1,2,2,4,6,4,5,2,4,5,3,4,6,4,7],options:{type:"line",lineColor:"#fff",highlightLineColor:"#fff",fillColor:a.color.success,spotColor:!1,minSpotColor:!1,maxSpotColor:!1,width:"100%",height:"150px"}},a.simpleChart1={data:[3,1,2,3,5,3,4,2],options:{type:"line",lineColor:a.color.primary,fillColor:"#fafafa",spotColor:!1,minSpotColor:!1,maxSpotColor:!1}},a.simpleChart2={data:[3,1,2,3,5,3,4,2],options:{type:"bar",barColor:a.color.primary}},a.simpleChart3={data:[3,1,2,3,5,3,4,2],options:{type:"pie",sliceColors:[a.color.primary,a.color.success,a.color.info,a.color.infoAlt,a.color.warning,a.color.danger]}},a.tristateChart1={data:[1,2,-3,-5,3,1,-4,2],options:{type:"tristate",posBarColor:a.color.success,negBarColor:a.color.danger}},a.largeChart1={data:[3,1,2,3,5,3,4,2],options:{type:"line",lineColor:a.color.info,highlightLineColor:"#fff",fillColor:a.color.info,spotColor:!1,minSpotColor:!1,maxSpotColor:!1,width:"100%",height:"150px"}},a.largeChart2={data:[3,1,2,3,5,3,4,2],options:{type:"bar",barColor:a.color.success,barWidth:10,width:"100%",height:"150px"}},a.largeChart3={data:[3,1,2,3,5],options:{type:"pie",sliceColors:[a.color.primary,a.color.success,a.color.info,a.color.infoAlt,a.color.warning,a.color.danger],width:"150px",height:"150px"}}}angular.module("app.chart").controller("chartCtrl",["$scope",a]).controller("chartjsCtrl",["$scope","$rootScope",b]).controller("flotChartCtrl",["$scope",c]).controller("sparklineCtrl",["$scope",d])}(),function(){"use strict";function a(){function a(a,b,c){var d,e,f;d=a.data,e=a.options,f=$.plot(b[0],d,e)}var b={restrict:"A",scope:{data:"=",options:"="},link:a};return b}function b(){function a(a,b,c){var d,e,f,g,h,i,j,k,l;d=[],e=[],j=200,l=200,h=function(a,b,c){function d(){var d,e,f,g;for(a.length>0&&(a=a.slice(1));a.length<j;)e=a.length>0?a[a.length-1]:(b+c)/2,g=e+4*Math.random()-2,b>g?g=b:g>c&&(g=c),a.push(g);for(f=[],d=0;d<a.length;)f.push([d,a[d]]),++d;return f}return d},f=h(d,28,42),g=h(e,56,72),k=function(){i.setData([f(),g()]),i.draw(),setTimeout(k,l)},i=$.plot(b[0],[f(),g()],{series:{lines:{show:!0,fill:!0},shadowSize:0},yaxis:{min:0,max:100},xaxis:{show:!1},grid:{hoverable:!0,borderWidth:1,borderColor:"#eeeeee"},colors:["#3F51B5","#C5CAE9"]}),k()}var b={restrict:"A",link:a};return b}function c(){function a(a,b,c){var d,e,f,g;d=a.data,e=a.options,f=void 0,g=function(){b.sparkline(d,e)},$(window).resize(function(a){clearTimeout(f),f=setTimeout(g,200)}),g()}var b={restrict:"A",scope:{data:"=",options:"="},link:a};return b}angular.module("app.chart").directive("flotChart",a).directive("flotChartRealtime",b).directive("sparkline",c)}(),function(){"use strict";angular.module("app.ui.form",[])}(),function(){"use strict";function a(a){a.color={red:97,green:211,blue:140},a.rating1=3,a.rating2=2,a.rating3=4,a.disabled1=0,a.disabled2=70,a.checkbox={},a.checkbox.cb1=!0,a.checkbox.cb2=!1,a.checkbox.cb3=!1,a.checkbox.cb4=!1,a.checkbox.cb5=!1,a.checkbox.cb6=!0,a.checkbox.cb7=!0,a.checkbox.cb8=!0,a.user={title:"Developer",email:"ipsum@lorem.com",firstName:"",lastName:"",company:"Google",address:"1600 Amphitheatre Pkwy",city:"Mountain View",state:"CA",biography:"Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!",postalCode:"94043"},a.radio={group1:"Banana",group2:"2",group3:"Primary"},a.radioData=[{label:"Radio: disabled",value:"1",isDisabled:!0},{label:"Radio: disabled, Checked",value:"2",isDisabled:!0}],a.select1="1",a.toppings=[{category:"meat",name:"Pepperoni"},{category:"meat",name:"Sausage"},{category:"meat",name:"Ground Beef"},{category:"meat",name:"Bacon"},{category:"veg",name:"Mushrooms"},{category:"veg",name:"Onion"},{category:"veg",name:"Green Pepper"},{category:"veg",name:"Green Olives"}],a.favoriteTopping=a.toppings[0].name,a.switchData={cb1:!0,cbs:!1,cb4:!0,color1:!0,color2:!0,color3:!0},a.switchOnChange=function(b){a.message="The switch is now: "+b}}function b(a){a.tags=["foo","bar"]}function c(a){a.today=function(){a.dt=new Date},a.today(),a.clear=function(){a.dt=null},a.disabled=function(a,b){return"day"===b&&(0===a.getDay()||6===a.getDay())},a.toggleMin=function(){a.minDate=a.minDate?null:new Date},a.toggleMin(),a.open=function(b){b.preventDefault(),b.stopPropagation(),a.opened=!0},a.dateOptions={formatYear:"yy",startingDay:1},a.formats=["dd-MMMM-yyyy","yyyy/MM/dd","dd.MM.yyyy","shortDate"],a.format=a.formats[0];var b=new Date;b.setDate(b.getDate()+1);var c=new Date;c.setDate(b.getDate()+2),a.events=[{date:b,status:"full"},{date:c,status:"partially"}],a.getDayClass=function(b,c){if("day"===c)for(var d=new Date(b).setHours(0,0,0,0),e=0;e<a.events.length;e++){var f=new Date(a.events[e].date).setHours(0,0,0,0);if(d===f)return a.events[e].status}return""}}function d(a){a.mytime=new Date,a.hstep=1,a.mstep=15,a.options={hstep:[1,2,3],mstep:[1,5,10,15,25,30]},a.ismeridian=!0,a.toggleMode=function(){return a.ismeridian=!a.ismeridian},a.update=function(){var b;return b=new Date,b.setHours(14),b.setMinutes(0),a.mytime=b},a.changed=function(){return void 0},a.clear=function(){return a.mytime=null}}function e(a){a.selected=void 0,a.states=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]}function f(a){a.rate=7,a.max=10,a.isReadonly=!1,a.hoveringOver=function(b){return a.overStar=b,a.percent=100*(b/a.max)},a.ratingStates=[{stateOn:"glyphicon-ok-sign",stateOff:"glyphicon-ok-circle"},{stateOn:"glyphicon-star",stateOff:"glyphicon-star-empty"},{stateOn:"glyphicon-heart",stateOff:"glyphicon-ban-circle"},{stateOn:"glyphicon-heart"},{stateOff:"glyphicon-off"}]}angular.module("app.ui.form").controller("FormCtrl",["$scope",a]).controller("TagsDemoCtrl",["$scope",b]).controller("DatepickerDemoCtrl",["$scope",c]).controller("TimepickerDemoCtrl",["$scope",d]).controller("TypeaheadCtrl",["$scope",e]).controller("RatingDemoCtrl",["$scope",f])}(),function(){"use strict";function a(){return{restrict:"A",link:function(a,b){b.slider()}}}function b(){return{restrict:"A",link:function(a,b){b.bootstrapFileInput()}}}function c(){return{restrict:"A",compile:function(a,b){return a.addClass("ui-spinner"),{post:function(){a.spinner()}}}}}function d(){return{restrict:"A",link:function(a,b){b.steps()}}}angular.module("app.ui.form").directive("uiRangeSlider",a).directive("uiFileUpload",b).directive("uiSpinner",c).directive("uiWizardForm",d)}(),function(){"use strict";angular.module("app.ui.form.validation",[])}(),function(){"use strict";function a(a){var b;a.form={required:"",minlength:"",maxlength:"",length_rage:"",type_something:"",confirm_type:"",foo:"",email:"",url:"",num:"",minVal:"",maxVal:"",valRange:"",pattern:""},b=angular.copy(a.form),a.revert=function(){return a.form=angular.copy(b),a.form_constraints.$setPristine()},a.canRevert=function(){return!angular.equals(a.form,b)||!a.form_constraints.$pristine},a.canSubmit=function(){return a.form_constraints.$valid&&!angular.equals(a.form,b)}}function b(a){var b;a.user={email:"",password:""},a.showInfoOnSubmit=!1,b=angular.copy(a.user),a.revert=function(){return a.user=angular.copy(b),a.form_signin.$setPristine()},a.canRevert=function(){return!angular.equals(a.user,b)||!a.form_signin.$pristine},a.canSubmit=function(){return a.form_signin.$valid&&!angular.equals(a.user,b)},a.submitForm=function(){return a.showInfoOnSubmit=!0,a.revert()}}function c(a){var b;a.user={name:"",email:"",password:"",confirmPassword:"",age:""},a.showInfoOnSubmit=!1,b=angular.copy(a.user),a.revert=function(){return a.user=angular.copy(b),a.form_signup.$setPristine(),a.form_signup.confirmPassword.$setPristine()},a.canRevert=function(){return!angular.equals(a.user,b)||!a.form_signup.$pristine},a.canSubmit=function(){return a.form_signup.$valid&&!angular.equals(a.user,b)},a.submitForm=function(){return a.showInfoOnSubmit=!0,a.revert()}}angular.module("app.ui.form.validation").controller("formConstraintsCtrl",["$scope",a]).controller("signinCtrl",["$scope",b]).controller("signupCtrl",["$scope",c])}(),function(){"use strict";function a(){function a(a,b,c,d){var e;e=function(b){var e;e=b===a.$eval(c.validateEquals),d.$setValidity("equal",e),"function"==typeof e?e({value:void 0}):void 0},d.$parsers.push(e),d.$formatters.push(e),a.$watch(c.validateEquals,function(a,b){a!==b&&d.$setViewValue(d.$ViewValue)})}var b={require:"ngModel",link:a};return b}angular.module("app.ui.form.validation").directive("validateEquals",a)}(),function(){"use strict";angular.module("app.nav",[])}(),function(){"use strict";function a(a){function b(b,c,d){var e;e=$("#app"),c.on("click",function(b){return e.hasClass("nav-collapsed-min")?e.removeClass("nav-collapsed-min"):(e.addClass("nav-collapsed-min"),a.$broadcast("nav:reset")),b.preventDefault()})}var c={restrict:"A",link:b};return c}function b(){function a(a,b,c){var d,e,f,g,h,i,j,k,l,m,n;m=250,j=$(window),g=b.find("ul").parent("li"),g.append('<i class="fa fa-angle-down icon-has-ul-h"></i><i class="fa fa-angle-right icon-has-ul"></i>'),d=g.children("a"),h=b.children("li").not(g),e=h.children("a"),f=$("#app"),i=$("#nav-container"),d.on("click",function(a){var b,c;return f.hasClass("nav-collapsed-min")||i.hasClass("nav-horizontal")&&j.width()>=768?!1:(c=$(this),b=c.parent("li"),g.not(b).removeClass("open").find("ul").slideUp(m),b.toggleClass("open").find("ul").stop().slideToggle(m),void a.preventDefault())}),e.on("click",function(a){g.removeClass("open").find("ul").slideUp(m)}),a.$on("nav:reset",function(a){g.removeClass("open").find("ul").slideUp(m)}),k=void 0,l=j.width(),n=function(){var a;a=j.width(),768>a&&f.removeClass("nav-collapsed-min"),768>l&&a>=768&&i.hasClass("nav-horizontal")&&g.removeClass("open").find("ul").slideUp(m),l=a},j.resize(function(){var a;clearTimeout(a),a=setTimeout(n,300)})}var b={restrict:"A",link:a};return b}function c(){function a(a,b,c,d){var e,f,g;f=b.find("a"),g=function(){return d.path()},e=function(a,b){return b="#"+b,angular.forEach(a,function(a){var c,d,e;return d=angular.element(a),c=d.parent("li"),e=d.attr("href"),c.hasClass("active")&&c.removeClass("active"),0===b.indexOf(e)?c.addClass("active"):void 0})},e(f,d.path()),a.$watch(g,function(a,b){return a!==b?e(f,d.path()):void 0})}var b={restrict:"A",controller:["$scope","$element","$attrs","$location",a]};return b}function d(){function a(a,b,c){b.on("click",function(){return $("#app").toggleClass("on-canvas")})}var b={restrict:"A",link:a};return b}angular.module("app.nav").directive("toggleNavCollapsedMin",["$rootScope",a]).directive("collapseNav",b).directive("highlightActive",c).directive("toggleOffCanvas",d)}(),function(){"use strict";angular.module("app.page",[])}(),function(){"use strict";function a(a,b){var c,d,e;a.printInvoice=function(){c=document.getElementById("invoice").innerHTML,d=document.body.innerHTML,e=window.open(),e.document.open(),e.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles/main.css" /></head><body onload="window.print()">'+c+"</html>"),e.document.close()}}function b(a,b,c){a.login=function(){c.url("/")},a.signup=function(){c.url("/")},a.reset=function(){c.url("/")},a.unlock=function(){c.url("/")}}angular.module("app.page").controller("invoiceCtrl",["$scope","$window",a]).controller("authCtrl",["$scope","$window","$location",b])}(),function(){"use strict";function a(){function a(a,b,c){var d,e;e=function(){return c.path()},d=function(a){switch(b.removeClass("body-wide body-err body-lock body-auth"),a){case"/404":case"/pages/404":case"/pages/500":return b.addClass("body-wide body-err");case"/pages/signin":case"/pages/signup":case"/pages/forgot-password":return b.addClass("body-wide body-auth");case"/pages/lock-screen":return b.addClass("body-wide body-lock")}},d(c.path()),a.$watch(e,function(a,b){return a!==b?d(c.path()):void 0})}var b={restrict:"A",controller:["$scope","$element","$location",a]};return b}angular.module("app.page").directive("customPage",a)}(),function(){"use strict";angular.module("app.table",[])}(),function(){"use strict";function a(a,b){var c;a.stores=[{name:"Nijiya Market",price:"$$",sales:292,rating:4},{name:"Eat On Monday Truck",price:"$",sales:119,rating:4.3},{name:"Tea Era",price:"$",sales:874,rating:4},{name:"Rogers Deli",price:"$",sales:347,rating:4.2},{name:"MoBowl",price:"$$$",sales:24,rating:4.6},{name:"The Milk Pail Market",price:"$",sales:543,rating:4.5},{name:"Nob Hill Foods",price:"$$",sales:874,rating:4},{name:"Scratch",price:"$$$",sales:643,rating:3.6},{name:"Gochi Japanese Fusion Tapas",price:"$$$",sales:56,rating:4.1},{name:"Cost Plus World Market",price:"$$",sales:79,rating:4},{name:"Bumble Bee Health Foods",price:"$$",sales:43,rating:4.3},{name:"Costco",price:"$$",sales:219,rating:3.6},{name:"Red Rock Coffee Co",price:"$",sales:765,rating:4.1},{name:"99 Ranch Market",price:"$",sales:181,rating:3.4},{name:"Mi Pueblo Food Center",price:"$",sales:78,rating:4},{name:"Cucina Venti",price:"$$",sales:163,rating:3.3},{name:"Sufi Coffee Shop",price:"$",sales:113,rating:3.3},{name:"Dana Street Roasting",price:"$",sales:316,rating:4.1},{name:"Pearl Cafe",price:"$",sales:173,rating:3.4},{name:"Posh Bagel",price:"$",sales:140,rating:4},{name:"Artisan Wine Depot",price:"$$",sales:26,rating:4.1},{name:"Hong Kong Chinese Bakery",price:"$",sales:182,rating:3.4},{name:"Starbucks",price:"$$",sales:97,rating:3.7},{name:"Tapioca Express",price:"$",sales:301,rating:3},{name:"House of Bagels",price:"$",sales:82,rating:4.4}],a.searchKeywords="",a.filteredStores=[],a.row="",a.select=function(b){var c,d;return d=(b-1)*a.numPerPage,c=d+a.numPerPage,a.currentPageStores=a.filteredStores.slice(d,c)},a.onFilterChange=function(){return a.select(1),a.currentPage=1,a.row=""},a.onNumPerPageChange=function(){return a.select(1),a.currentPage=1},a.onOrderChange=function(){return a.select(1),a.currentPage=1},a.search=function(){return a.filteredStores=b("filter")(a.stores,a.searchKeywords),a.onFilterChange()},a.order=function(c){return a.row!==c?(a.row=c,a.filteredStores=b("orderBy")(a.stores,c),a.onOrderChange()):void 0},a.numPerPageOpt=[3,5,10,20],a.numPerPage=a.numPerPageOpt[2],a.currentPage=1,a.currentPageStores=[],(c=function(){return a.search(),a.select(a.currentPage)})()}angular.module("app.table").controller("tableCtrl",["$scope","$filter",a])}(),function(){"use strict";angular.module("app.ui",[])}(),function(){"use strict";function a(a,b){a.start=function(){b.start()},a.inc=function(){b.inc()},a.set=function(){b.set(.3)},a.complete=function(){b.complete()}}function b(a,b){a.notify=function(a){switch(a){case"info":return b.log("Heads up! This alert needs your attention, but it's not super important.");case"success":return b.logSuccess("Well done! You successfully read this important alert message.");case"warning":return b.logWarning("Warning! Best check yo self, you're not looking too good.");case"error":return b.logError("Oh snap! Change a few things up and try submitting again.")}}}function c(a){a.alerts=[{type:"success",msg:"Well done! You successfully read this important alert message."},{type:"info",msg:"Heads up! This alert needs your attention, but it is not super important."},{type:"warning",msg:"Warning! Best check yo self, you're not looking too good."},{type:"danger",msg:"Oh snap! Change a few things up and try submitting again."}],a.addAlert=function(){var b,c;switch(b=Math.ceil(4*Math.random()),c=void 0,b){case 0:c="info";break;case 1:c="success";break;case 2:c="info";break;case 3:c="warning";break;case 4:c="danger"}return a.alerts.push({type:c,msg:"Another alert!"})},a.closeAlert=function(b){return a.alerts.splice(b,1)}}function d(a){a.max=200,a.random=function(){var b,c;c=Math.floor(100*Math.random()+10),b=void 0,b=25>c?"success":50>c?"info":75>c?"warning":"danger",a.showWarning="danger"===b||"warning"===b,a.dynamic=c,a.type=b},a.random()}function e(a){a.oneAtATime=!0,a.groups=[{title:"Dynamic Group Header - 1",content:"Dynamic Group Body - 1"},{title:"Dynamic Group Header - 2",content:"Dynamic Group Body - 2"},{title:"Dynamic Group Header - 3",content:"Dynamic Group Body - 3"}],a.items=["Item 1","Item 2","Item 3"],a.status={isFirstOpen:!0,isFirstOpen1:!0},a.addItem=function(){var b;b=a.items.length+1,a.items.push("Item "+b)}}function f(a){a.isCollapsed=!1}function g(a,b,c){a.items=["item1","item2","item3"],a.open=function(){var d;d=b.open({templateUrl:"myModalContent.html",controller:"ModalInstanceCtrl",resolve:{items:function(){return a.items}}}),d.result.then(function(b){a.selected=b},function(){c.info("Modal dismissed at: "+new Date)})}}function h(a,b,c){a.items=c,a.selected={item:a.items[0]},a.ok=function(){b.close(a.selected.item)},a.cancel=function(){b.dismiss("cancel")}}function i(a){a.totalItems=64,a.currentPage=4,a.setPage=function(b){a.currentPage=b},a.maxSize=5,a.bigTotalItems=175,a.bigCurrentPage=1}function j(a){a.tabs=[{title:"Dynamic Title 1",content:"Dynamic content 1.  Consectetur adipisicing elit. Nihil, quidem, officiis, et ex laudantium sed cupiditate voluptatum libero nobis sit illum voluptates beatae ab. Ad, repellendus non sequi et at."},{title:"Disabled",content:"Dynamic content 2.  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, quidem, officiis, et ex laudantium sed cupiditate voluptatum libero nobis sit illum voluptates beatae ab. Ad, repellendus non sequi et at.",disabled:!0}],a.navType="pills"}function k(a){a.list=[{id:1,title:"Item 1",items:[]},{id:2,title:"Item 2",items:[{id:21,title:"Item 2.1",items:[{id:211,title:"Item 2.1.1",items:[]},{id:212,title:"Item 2.1.2",items:[]}]}]},{id:3,title:"Item 3",items:[]},{id:4,title:"Item 4",items:[{id:41,title:"Item 4.1",items:[]}]},{id:5,title:"Item 5",items:[]}],a.selectedItem={},a.options={},a.remove=function(a){a.remove()},a.toggle=function(a){a.toggle()},a.newSubItem=function(a){var b;b=a.$modelValue,b.items.push({id:10*b.id+b.items.length,title:b.title+"."+(b.items.length+1),items:[]})}}function l(a,b,c){var d,e;for(e=[],d=0;8>d;)e[d]=new google.maps.Marker({title:"Marker: "+d}),d++;a.GenerateMapMarkers=function(){var b,c,f,g,h;for(b=new Date,a.date=b.toLocaleString(),h=Math.floor(4*Math.random())+4,d=0;h>d;)c=43.66+Math.random()/100,f=-79.4103+Math.random()/100,g=new google.maps.LatLng(c,f),e[d].setPosition(g),e[d].setMap(a.map),d++},c(a.GenerateMapMarkers,2e3)}angular.module("app.ui").controller("LoaderCtrl",["$scope","cfpLoadingBar",a]).controller("NotifyCtrl",["$scope","logger",b]).controller("AlertDemoCtrl",["$scope",c]).controller("ProgressDemoCtrl",["$scope",d]).controller("AccordionDemoCtrl",["$scope",e]).controller("CollapseDemoCtrl",["$scope",f]).controller("ModalDemoCtrl",["$scope","$modal","$log",g]).controller("ModalInstanceCtrl",["$scope","$modalInstance","items",h]).controller("PaginationDemoCtrl",["$scope",i]).controller("TabsDemoCtrl",["$scope",j]).controller("TreeDemoCtrl",["$scope",k]).controller("MapDemoCtrl",["$scope","$http","$interval",l]);
}(),function(){"use strict";function a(){function a(a,b){a.addClass("ui-wave");var c,d,e,f;a.off("click").on("click",function(a){var b=$(this);0===b.find(".ink").length&&b.prepend("<span class='ink'></span>"),c=b.find(".ink"),c.removeClass("wave-animate"),c.height()||c.width()||(d=Math.max(b.outerWidth(),b.outerHeight()),c.css({height:d,width:d})),e=a.pageX-b.offset().left-c.width()/2,f=a.pageY-b.offset().top-c.height()/2,c.css({top:f+"px",left:e+"px"}).addClass("wave-animate")})}var b={restrict:"A",compile:a};return b}function b(){function a(a,b){var c,d;d=function(){var a,e,f,g,h,i;return i=new Date,a=i.getHours(),e=i.getMinutes(),f=i.getSeconds(),e=c(e),f=c(f),h=a+":"+e+":"+f,b.html(h),g=setTimeout(d,500)},c=function(a){return 10>a&&(a="0"+a),a},d()}var b={restrict:"A",link:a};return b}function c(){return{restrict:"A",compile:function(a,b){return a.on("click",function(a){a.stopPropagation()})}}}function d(){return{restrict:"A",link:function(a,b,c){return b.slimScroll({height:c.scrollHeight||"100%"})}}}function e(){return{restrict:"A",link:function(a,b,c){return Holder.run({images:b[0]})}}}angular.module("app.ui").directive("uiWave",a).directive("uiTime",b).directive("uiNotCloseOnClick",c).directive("slimScroll",d).directive("imgHolder",e)}(),function(){"use strict";function a(){var a;return toastr.options={closeButton:!0,positionClass:"toast-bottom-right",timeOut:"3000"},a=function(a,b){return toastr[b](a)},{log:function(b){a(b,"info")},logWarning:function(b){a(b,"warning")},logSuccess:function(b){a(b,"success")},logError:function(b){a(b,"error")}}}angular.module("app.ui").factory("logger",a)}(),function(){"use strict";angular.module("app.ui.map",[])}(),function(){"use strict";function a(a){var b;b=[{latLng:[40.71,-74],name:"New York"},{latLng:[39.9,116.4],name:"Beijing"},{latLng:[31.23,121.47],name:"Shanghai"},{latLng:[-33.86,151.2],name:"Sydney"},{latLng:[-37.81,144.96],name:"Melboune"},{latLng:[37.33,-121.89],name:"San Jose"},{latLng:[1.3,103.8],name:"Singapore"},{latLng:[47.6,-122.33],name:"Seattle"},{latLng:[41.87,-87.62],name:"Chicago"},{latLng:[37.77,-122.41],name:"San Francisco"},{latLng:[32.71,-117.16],name:"San Diego"},{latLng:[51.5,-.12],name:"London"},{latLng:[48.85,2.35],name:"Paris"},{latLng:[52.52,13.4],name:"Berlin"},{latLng:[-26.2,28.04],name:"Johannesburg"},{latLng:[35.68,139.69],name:"Tokyo"},{latLng:[13.72,100.52],name:"Bangkok"},{latLng:[37.56,126.97],name:"Seoul"},{latLng:[41.87,12.48],name:"Roma"},{latLng:[45.42,-75.69],name:"Ottawa"},{latLng:[55.75,37.61],name:"Moscow"},{latLng:[-22.9,-43.19],name:"Rio de Janeiro"}],a.worldMap={map:"world_mill_en",markers:b,normalizeFunction:"polynomial",backgroundColor:null,zoomOnScroll:!1,regionStyle:{initial:{fill:"#EEEFF3"},hover:{fill:a.color.primary}},markerStyle:{initial:{fill:"#BF616A",stroke:"rgba(191,97,106,.8)","fill-opacity":1,"stroke-width":9,"stroke-opacity":.5},hover:{stroke:"black","stroke-width":2}}}}angular.module("app.ui.map").controller("jvectormapCtrl",["$scope",a])}(),function(){"use strict";function a(){return{restrict:"A",scope:{options:"="},link:function(a,b,c){var d;d=a.options,b.vectorMap(d)}}}angular.module("app.ui.map").directive("uiJvectormap",a)}();
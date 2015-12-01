// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-07-14 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/matchmedia/matchMedia.js',
      'bower_components/matchmedia-ng/matchmedia-ng.js',
      'bower_components/webcomponentsjs/webcomponents.js',
      'bower_components/jquery-waypoints/waypoints.js',
      'bower_components/angular-waypoints/dist/angular-waypoints.js',
      'bower_components/satellizer/satellizer.js',
      'bower_components/angular-date-dropdowns/directive.js',
      'bower_components/moment/moment.js',
      'bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
      'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
      'bower_components/ng-file-upload/ng-file-upload.js',
      'bower_components/ng-file-upload-shim/ng-file-upload-shim.js',
      'bower_components/angular-dynamic-locale/src/tmhDynamicLocale.js',
      'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
      'bower_components/angular-translate-handler-log/angular-translate-handler-log.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'bower_components/sweetalert/dist/sweetalert.min.js',
      'bower_components/angular-sweetalert/SweetAlert.js',
      'bower_components/select2/select2.js',
      'bower_components/ui-select/src/select3.js',
      'bower_components/angular-ui-select/dist/select.js',
      'bower_components/ng-tags-input/ng-tags-input.min.js',
      'bower_components/angular-background/dist/angular-background.min.js',
      'bower_components/angularjs-socialshare/dist/angular-socialshare.min.js',
      'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
      'bower_components/angular-loading-bar/build/loading-bar.js',
      'bower_components/get-style-property/get-style-property.js',
      'bower_components/get-size/get-size.js',
      'bower_components/matches-selector/matches-selector.js',
      'bower_components/eventie/eventie.js',
      'bower_components/doc-ready/doc-ready.js',
      'bower_components/eventEmitter/EventEmitter.js',
      'bower_components/fizzy-ui-utils/utils.js',
      'bower_components/outlayer/item.js',
      'bower_components/outlayer/outlayer.js',
      'bower_components/masonry/masonry.js',
      'bower_components/jquery-bridget/jquery.bridget.js',
      'bower_components/isotope/js/item.js',
      'bower_components/isotope/js/layout-mode.js',
      'bower_components/isotope/js/isotope.js',
      'bower_components/isotope/js/layout-modes/vertical.js',
      'bower_components/isotope/js/layout-modes/fit-rows.js',
      'bower_components/isotope/js/layout-modes/masonry.js',
      'bower_components/classie/classie.js',
      'bower_components/unipointer/unipointer.js',
      'bower_components/unidragger/unidragger.js',
      'bower_components/tap-listener/tap-listener.js',
      'bower_components/flickity/js/index.js',
      'bower_components/headroom.js/dist/headroom.js',
      'bower_components/headroom.js/dist/jQuery.headroom.js',
      'bower_components/headroom.js/dist/angular.headroom.js',
      'bower_components/bootstrap-switch/dist/js/bootstrap-switch.js',
      'bower_components/angular-bootstrap-switch/dist/angular-bootstrap-switch.js',
      'bower_components/underscore/underscore.js',
      'bower_components/elasticsearch/elasticsearch.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/snap.svg/dist/snap.svg-min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};

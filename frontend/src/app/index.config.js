(function() {
  'use strict';

  angular
    .module('winwins')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, ENV) {

    // Enable log
    var debug = true;
    if(ENV.name === 'prod') {
      debug = false;
    }
    $logProvider.debugEnabled(debug);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();

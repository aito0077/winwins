(function() {
  'use strict';

  angular
    .module('winwins')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, ENV, RestangularProvider) {

    // Enable log
    var debug = true;
    if(ENV.name === 'prod') {
      debug = false;
    }
    $logProvider.debugEnabled(debug);

    // Toastr Set options
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    // Restangular Set options
    RestangularProvider.setBaseUrl(ENV.apiBase);
    RestangularProvider.setRequestSuffix('/');
    RestangularProvider.setRestangularFields({
      selfLink: 'url'
    });
  }

})();

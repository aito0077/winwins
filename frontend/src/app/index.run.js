(function() {
  'use strict';

  angular
    .module('winwins')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, gettextCatalog, ENV) {

    var changeLang = function(event, lang) {
      gettextCatalog.setCurrentLanguage(lang);
    };

    // With var, so can destroy it
    var event1 = $rootScope.$on('changeLang', changeLang);

    gettextCatalog.baseLanguage = ENV.baseLang;
    changeLang(null, ENV.defaultLang);

    if(ENV.name !== 'prod') {
      gettextCatalog.debug = true;
      gettextCatalog.debugPrefix = '[Missing]:';
    }
  }

})();

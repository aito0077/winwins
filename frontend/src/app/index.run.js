(function() {
  'use strict';

  angular
    .module('winwins')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, gettextCatalog, ENV) {
    gettextCatalog.baseLanguage = 'es';
    gettextCatalog.setCurrentLanguage('es');
    if(ENV.name !== 'prod') {
      gettextCatalog.debug = true;
      gettextCatalog.debugPrefix = '[Missing]:';
    }
  }

})();

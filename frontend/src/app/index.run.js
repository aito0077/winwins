(function() {
  'use strict';

  angular
    .module('winwins')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('CrearWinwinController', CrearWinwinController);

  /** @ngInject */
  function CrearWinwinController($stateParams, winwin, ENV, $mdDialog, $document) {
    var vm = this;

    vm.imageServer = ENV.imageServer;

    
    
  }


})();

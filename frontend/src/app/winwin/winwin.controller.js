(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('WinwinController', WinwinController);

  /** @ngInject */
  function WinwinController($stateParams, winwin, ENV) {
    var vm = this;

    vm.imageServer = ENV.imageServer;

    vm.winwinId = $stateParams.winwinId;

    winwin.getWinwin(vm.winwinId)
    .then(function(winwin_data) {
			vm.winwin = winwin_data;
			vm.winwin.closing_date = new Date(vm.winwin.closing_date);
  	});
  }

})();

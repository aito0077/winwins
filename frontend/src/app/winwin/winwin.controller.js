(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('WinwinController', WinwinController);

  /** @ngInject */
  function WinwinController($stateParams, winwin, ENV, $mdDialog, $document) {
    var vm = this;

    vm.imageServer = ENV.imageServer;

    vm.winwinId = $stateParams.winwinId;

    winwin.getWinwin(vm.winwinId).then(function(winwin_data) {
      vm.winwin = winwin_data;
      vm.winwin.closing_date = new Date(vm.winwin.closing_date);
    });

    vm.showMasDetalleDialog = function(ev) {
      $mdDialog.show({
        controller: MasDetalleController,
        templateUrl: 'app/winwin/ver-mas-detalle.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          winwin: vm.winwin
        }
      });
    };
    vm.showParticipantesDialog = function(ev) {
      $mdDialog.show({
        controller: ParticipantesController,
        templateUrl: 'app/winwin/participantes.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          users: vm.winwin.users
        }
      });
    };
  }

  /** @ngInject */
  function MasDetalleController($scope, winwin) {
    $scope.winwin = winwin;
  }
  
  /** @ngInject */
  function ParticipantesController($scope, users, ENV){
    $scope.imageServer = ENV.imageServer;
    $scope.users = users;
  }

})();

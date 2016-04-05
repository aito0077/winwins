(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, sponsors, winwin, miembro, partners, gettextCatalog, gettext, $auth) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    //vm.creationDate = 1458584706984;
    vm.sponsors = sponsors;
    winwin.getList(0, 'last', 6).then(function(data) {
      vm.recientes = data;
    });
    winwin.getList(0, 'all', 6).then(function(data) {
      vm.destacados = data;
    });
    miembro.getList(0, 20).then(function(data) {
      vm.miembros = data;
    });
    vm.partners = partners;
    vm.tdestacados = gettextCatalog.getString(gettext('Winwins Destacados'));
    vm.tpopulares = gettextCatalog.getString(gettext('Winwins Populares'));
    vm.trecientes = gettextCatalog.getString(gettext('Winwins Recientes'));
    vm.tterminar = gettextCatalog.getString(gettext('Winwins por terminar'));
    vm.tconcretados = gettextCatalog.getString(gettext('Winwins concretados'));

    vm.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
  }
})();

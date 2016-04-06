(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, sponsor, winwin, miembro, partners, gettextCatalog, gettext, $auth) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';

    sponsor.getList(0, 6).then(function(data) {
      vm.sponsors = data;
    });
    winwin.getList(0, 'last', 6).then(function(data) {
      vm.recientes = data;
    });
    winwin.getList(0, 'all', 6).then(function(data) {
      vm.destacados = data;
    });
    miembro.getList(0, 20).then(function(data) {
      vm.miembros = data;
    });
    sponsor.getMainList().then(function(data) {
      vm.partners = data;
    });

    vm.tdestacados = gettextCatalog.getString(gettext('Winwins Destacados'));
    vm.tpopulares = gettextCatalog.getString(gettext('Winwins Populares'));
    vm.trecientes = gettextCatalog.getString(gettext('Winwins Recientes'));
    vm.tterminar = gettextCatalog.getString(gettext('Winwins por terminar'));
    vm.tconcretados = gettextCatalog.getString(gettext('Winwins concretados'));

    vm.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    vm.doFilter = function(filter) {
      winwin.getList(0, filter, 6).then(function(data) {
        vm.destacados = data;
      });
    };

    vm.doCategories = function(categories) {
      winwin.getListByCategory(0, categories, 6).then(function(data) {
        vm.destacados = data;
      });
    };

  }
})();

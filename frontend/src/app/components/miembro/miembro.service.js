(function() {
  'use strict';

  angular
      .module('winwins')
      .service('miembro', miembro);

  /** @ngInject */
  function miembro($log, Restangular, $q) {

    var _miembro = {};

    var testData = [
      { id: 1, nombre: 'Facundo Mainere' , imagen: 'facu.jpg' },
      { id: 2, nombre: 'Neto Licursi' , imagen: 'neto.jpg' },
      { id: 3, nombre: 'Damian Mautano' , imagen: 'dami.jpg' },
      { id: 4, nombre: 'Jose Luis Di Biase' , imagen: 'jose.jpg' },
      { id: 5, nombre: 'Claudio Bidau' , imagen: 'clodo.jpg' },
      { id: 6, nombre: 'Nestor Ancel' , imagen: 'nestor.jpg' },
      { id: 7, nombre: 'Nicolas Doallo' , imagen: 'nico.jpg' },
      { id: 8, nombre: 'Adrian Pardini' , imagen: 'adri.jpg' }
    ];

    _miembro.getList = function() {
      var dfd = $q.defer();
      dfd.resolve(testData);
      return dfd.promise;
    };

    return _miembro;
  }

})();

(function() {
  'use strict';

  angular
      .module('winwins')
      .service('miembro', miembro);

  /** @ngInject */
  function miembro($log, Restangular, $q) {

    var _miembro = {};

    var testData = [
      { id: 1, nombre: 'Facundo Mainere' , imagen: 'assets/images/100-2.jpeg' },
      { id: 2, nombre: 'Neto Licursi' , imagen: 'assets/images/100-2.jpeg' },
      { id: 3, nombre: 'Damian Mautano' , imagen: 'assets/images/100-2.jpeg' },
      { id: 4, nombre: 'Jose Luis Di Biase' , imagen: 'assets/images/100-2.jpeg' },
      { id: 5, nombre: 'Claudio Bidau' , imagen: 'assets/images/100-2.jpeg' },
      { id: 6, nombre: 'Nestor Ancel' , imagen: 'assets/images/100-2.jpeg' },
      { id: 7, nombre: 'Nicolas Doallo' , imagen: 'assets/images/100-2.jpeg' },
      { id: 8, nombre: 'Adrian Pardini' , imagen: 'assets/images/100-2.jpeg' },
      { id: 9, nombre: 'Nestor Ancel' , imagen: 'assets/images/100-2.jpeg' },
      { id: 10, nombre: 'Nicolas Doallo' , imagen: 'assets/images/100-2.jpeg' },
      { id: 11, nombre: 'Adrian Pardini' , imagen: 'assets/images/100-2.jpeg' },
      { id: 12, nombre: 'Nestor Ancel' , imagen: 'assets/images/100-2.jpeg' },
      { id: 13, nombre: 'Nicolas Doallo' , imagen: 'assets/images/100-2.jpeg' },
      { id: 14, nombre: 'Adrian Pardini' , imagen: 'assets/images/100-2.jpeg' },
      { id: 15, nombre: 'Nestor Ancel' , imagen: 'assets/images/100-2.jpeg' },
      { id: 16, nombre: 'Nicolas Doallo' , imagen: 'assets/images/100-2.jpeg' },
      { id: 17, nombre: 'Adrian Pardini' , imagen: 'assets/images/100-2.jpeg' },
      { id: 18, nombre: 'Nestor Ancel' , imagen: 'assets/images/100-2.jpeg' },
      { id: 19, nombre: 'Nicolas Doallo' , imagen: 'assets/images/100-2.jpeg' },
      { id: 20, nombre: 'Adrian Pardini' , imagen: 'assets/images/100-2.jpeg' }
    ];

    _miembro.getList = function() {
      var dfd = $q.defer();
      dfd.resolve(testData);
      return dfd.promise;
    };

    return _miembro;
  }

})();

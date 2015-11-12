(function(){
  'use strict';

  angular
    .module('test2015')
    .controller('LineController', LineController);

  /** @ngInject */
  function LineController($timeout, $log){
    var vm = this;
    vm.labels = ["January", "February", "March", "April", "May", "June", "July"];
    vm.series = ['Series A', 'Series B'];
    vm.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    vm.onClick = function (points, evt) {
      $log.info(points, evt);
    };

    // Simulate async data update
    $timeout(function () {
      vm.data = [
        [28, 48, 40, 19, 86, 27, 90],
        [65, 59, 80, 81, 56, 55, 40]
      ];
    }, 3000);

  }

})();

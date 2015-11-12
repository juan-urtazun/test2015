(function() {
  'use strict';

  angular
    .module('test2015')
    .controller('ChartController', ChartController);

  /** @ngInject */
  function ChartController( $log, $state, apiService, $stateParams ) {
    var vm = this;
    vm.$state = $state;

    apiService.getPropsForChart($stateParams.type).then(function( chartProps ){
        vm.chartProps = chartProps;
    });
  }
})();


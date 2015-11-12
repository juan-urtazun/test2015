(function() {
  'use strict';

  angular
    .module('test2015')
    .controller('ChartController', ChartController);

  /** @ngInject */
  function ChartController( $log, $state, apiService, $stateParams ) {
    var vm = this;
    vm.onFilter = function( event ){
        event.stopPropagation();
        getChartProps( vm.filters );
    }


    function getChartProps( filters ){
      apiService.getPropsForChart($stateParams.type ||'line', filters)
        .then(function( chartProps ){
          vm.chartProps = chartProps;
        });
    }


    function init(){
      getChartProps();
    }

    init();
  }
})();


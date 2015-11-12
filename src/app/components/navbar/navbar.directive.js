(function() {
  'use strict';

  angular
    .module('test2015')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController( $stateParams,  $rootScope ) {
      var vm = this;
      vm.active_home = !$stateParams.filters
      vm.active_home_advanced = $stateParams.filters
      vm.toggleClass= function( linkEnabled, linkDisables, $state){
        debugger;
        vm[linkEnabled] = true;
        vm[linkDisables] = false;
        debugger;
        if(vm.active_home){
           $rootScope.$state.go('home.chart', {type:'line'});
        }else{
            $rootScope.$state.go('home.chart.advance', {type:'line'});
        }

      }
    }
  }

})();

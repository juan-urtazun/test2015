(function() {
  'use strict';

  angular
    .module('test2015')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr) {
    var vm = this;
    vm.changeOptions = function(){
      console.log("new state", vm.state);
    }
    vm.states = [{id:1, label:"ana maria"},
    {id:2, label:"celina"},
     {id:3, label:"otra"}]

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1447199614537;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();

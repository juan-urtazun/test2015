(function() {
  'use strict';



  angular
    .module('test2015')
    .factory('apiService', apiService);

  /** @ngInject */
  function apiService($log, $q, $timeout, $state, lodash, mockDataService) {
    var mockData = {};
    var dataPromise = mockDataService.getMock();

    dataPromise.then( _setData, _handleError );




    var service = {
      data: undefined,
      getQuestion: getQuestion,
      getTotalAnswers: getTotalAnswers,
      getPropsForChart: getPropsForChart
     };



    return service;

    function _getData( getterCb ){
      var deferred = $q.defer();
      var promise = deferred.promise;
      if(!service.data){
        dataPromise.then(function( result ){
          $timeout(function() {
            deferred.resolve( getterCb() );
         }, 5);
        });
      }else{
        deferred.resolve( getterCb() );
      }
      return promise;
    }

    function _setData( results ){
      service.data = results;
    }

    function _handleError( e ){
      $log.error("Fail: ", e, e.stack );
    }

    function _getQuestion(){
      return service.data.question;
    }

    function getQuestion() {
       return _getData( _getQuestion );
    }

    function _getTotalAnswers(){
      var anwsers = service.data.answers;
      var chartProps = {};

      chartProps.labels = lodash.pluck(anwsers,  'text');
      chartProps.series = ["Porcentaje", "Respuestas"];
      chartProps.data = [ lodash.pluck(anwsers,  'percentage'), lodash.pluck(anwsers,  'count') ];
      return chartProps;
    }


    function _getTotalAnswersForDoughnut(){
      var anwsers = service.data.answers;
      var chartProps = {};

      chartProps.labels = lodash.pluck(anwsers,  'text');
      chartProps.percentage = lodash.pluck(anwsers,  'percentage') ;
      chartProps.count = lodash.pluck(anwsers,  'count') ;
      return chartProps;
    }

    function getTotalAnswers(){
      return _getData( _getTotalAnswers );
    }

    function getTotalAnswersForDoughnut(){
      return _getData( _getTotalAnswersForDoughnut );
    }



    function getPropsForChart ( c_type ) {
      var availableCharts = {
        line: getTotalAnswers,
        bar: getTotalAnswers,
        doughnut: getTotalAnswersForDoughnut,
        'polar-area': getTotalAnswersForDoughnut
      };
       try{
        return availableCharts[c_type].call();

       }catch( e ){

        $log.error("Error", e);
          $state.go("error");
       }
    }



  }
})();

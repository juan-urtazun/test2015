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
      getPropsForChart: getPropsForChart,
      getUserTags: getUserTags
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

    function _getUserTags(){
       return _.map(service.data.userTags, function(tag, i){
          return {id:i, label: i, data: tag};
        });
    }

    function getUserTags() {
       return _getData( _getUserTags );
    }

    function _getTotalAnswers( filters ){
      console.log("filters", filters);
      var anwsers = service.data.answers;
      var chartProps = {};

      chartProps.labels = lodash.pluck(anwsers,  'text');
      chartProps.series = ["#Respuestas", "Porcentaje"];
      if(filters){
        chartProps.data  = [];
        chartProps.series  = [];
        lodash.forEach(filters, function( f ) {
           chartProps.data .push(f.data.answers, f.data.percentage);
           chartProps.series.push("#Respuestas " + f.id, "Porcentaje " + f.id);
        });

      }else{
        chartProps.data = [ lodash.pluck(anwsers,  'percentage'), lodash.pluck(anwsers,  'count') ];
      }

      console.log("chartProps", chartProps);
      return chartProps;
    }


    function _getTotalAnswersForDoughnut( filters ){
      var anwsers = service.data.answers;
      var chartProps = {};
      chartProps.labels = lodash.pluck(anwsers,  'text');
      if( filters ){
        console.log("_getTotalAnswersForDoughnut", filters);
          chartProps.labels = [];
          chartProps.percentage = [];
          chartProps.count = [];
          lodash.forEach( filters, function ( f ) {
            chartProps.percentage.push( f.data.percentage );
            chartProps.count.push( f.data.answers ) ;
            chartProps.labels.push("#Respuestas " + f.id, "Porcentaje " + f.id);
          });

          chartProps.percentage = lodash.reduceRight( chartProps.percentage , function(flattened, other) {
              return flattened.concat(other);
            }, []);
          chartProps.count = lodash.reduceRight( chartProps.count , function(flattened, other) {
              return flattened.concat(other);
            }, []);
      }else{
        chartProps.percentage = lodash.pluck(anwsers,  'percentage') ;
        chartProps.count = lodash.pluck(anwsers,  'count') ;
      }
      console.log("chartProps", chartProps);
      return chartProps;
    }

    function getTotalAnswers( filters ){
      return _getData( _getTotalAnswers.bind( null, filters ) );
    }

    function getTotalAnswersForDoughnut( filters ){
      return _getData( _getTotalAnswersForDoughnut.bind( null, filters ) );
    }



    function getPropsForChart ( c_type, filters ) {
      var availableCharts = {
        line: getTotalAnswers,
        bar: getTotalAnswers,
        doughnut: getTotalAnswersForDoughnut,
        'polar-area': getTotalAnswersForDoughnut,
        radar: getTotalAnswers
      };
       try{
        return availableCharts[c_type](filters);

       }catch( e ){

        $log.error("Error", e);
          $state.go("error");
       }
    }



  }
})();

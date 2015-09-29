var truckApp = angular.module('truckApp', ['ui.router']);


truckApp.config(function(
                          $stateProvider,
                          $urlRouterProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('index',{
    url: '/',
    
    views:{
        'search': {
        templateUrl: 'javascript/templates/search.html',
        controller: 'truckCtrl',
        },
        'map': {
          templateUrl: 'javascript/templates/map.html',
          resolve: {
            coords: function($http, geoDataService){
                     
                     return $http.get('http://ipinfo.io/json').
                       success( function(data) {
                         return data;
                        });
                       
            }
          },
          controller: 'mapCtrl',
          
        },
        '': {
          templateUrl: 'javascript/templates/results.html',
          controller: 'truckCtrl',
        }

      }
  });


});

//Handling errors helper
truckApp.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});



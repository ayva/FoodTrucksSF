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



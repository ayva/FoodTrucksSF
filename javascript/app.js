var trackApp = angular.module('trackApp', ['ui.router']);


trackApp.config(function(
                          $stateProvider,
                          $urlRouterProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('index',{
    url: '/',
    
    views:{
        'search': {
        templateUrl: 'javascript/templates/search.html',
        controller: 'trackCtrl',
        },
        'map': {
          templateUrl: 'javascript/templates/map.html',
          controller: 'mapCtrl',
        },
        '': {
          templateUrl: 'javascript/templates/results.html',
          controller: 'trackCtrl',
        }

      }
  });


});

//Handling errors helper
trackApp.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});



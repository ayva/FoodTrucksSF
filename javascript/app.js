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


var fivesBounce = function(n, arr=[], sign=-1){
  if (array[-1]==start) retutn;

  array=arr
  array.push(n)
  n = n + sign*5
  if (n<0){ sign = +1 }

  

  if (arr[-1] == n){return arr}
    else{function(n, array, sign) }

}
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
          resolve: {
            coords: function($http, geoDataService){
              return $http.get('http://ipinfo.io/json').
                       success(function(data) {
                         var coords = data.loc.split(",")

                         geoDataService.response.center.longitude = Number(coords[0]);
                         geoDataService.response.center.latitude = Number(coords[1]);
                         console.log(coords)
                         if ( geoDataService.response.center.longitude > 39 || 
                              geoDataService.response.center.longitude < 37 || 
                              geoDataService.response.center.latitude > -121 || 
                              geoDataService.response.center.latitude < -124 ) {
                              geoDataService.response.center.longitude = 37.78;
                              geoDataService.response.center.latitude = -122.41;
                          }
                          console.log("Saved coords", geoDataService.response.center.longitude, geoDataService.response.center.latitude)
                     });
            }
          }
          
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



truckApp.controller('mapCtrl',  [ '$scope', '$http', 'coords',
                                    'truckDataService',
                                    'geoDataService', 
                                     function( $scope, $http, coords,
                                            truckDataService,
                                            geoDataService
                                            ){



  $scope.coords = {
                    longitude: Number(coords.data.loc.split(",")[0]),
                    latitude: Number(coords.data.loc.split(",")[1])
                        };
 //In case location was not defined or was outside of SF 
 if ( $scope.coords.longitude > 39 ||
      $scope.coords.longitude < 37 ||
      $scope.coords.latitude > -121 ||
      $scope.coords.latitude < -124 ) {
      $scope.coords.longitude = 37.78;
      $scope.coords.latitude = -122.41;
  }

  
  geoDataService.response.geoip.longitude = $scope.coords.longitude;
  geoDataService.response.geoip.latitude = $scope.coords.latitude;

  $scope.map = L.map('map', geoDataService.response.map);
  geoDataService.response.map = $scope.map;


  $scope.markers = new L.LayerGroup().addTo($scope.map);
  geoDataService.response.markers = $scope.markers;
  
  $scope.cicles = new L.LayerGroup().addTo($scope.map);
  geoDataService.response.cicles = $scope.cicles;

  geoDataService.getTrucks();
  // create the tile layer with correct attribution
  var tilesURL='http://tile.stamen.com/terrain/{z}/{x}/{y}.png';
  var tiles = new L.TileLayer(tilesURL, {
      opacity: 0.7,
      detectRetina: true,
      unloadInvisibleTiles: true,
      updateWhenIdle: true,
      reuseTiles: true
  });
  tiles.addTo($scope.map);

  //Searching for food by click on map
  $scope.map.on('click', function(e) {
    //Taking coords from map
    geoDataService.response.center.longitude = Number(e.latlng.lng).toFixed(6);
     geoDataService.response.center.latitude = Number(e.latlng.lat).toFixed(6);


    //Grabbing trucks for choosen location
    truckDataService.getTruckData( Number(e.latlng.lng).toFixed(6), Number(e.latlng.lat).toFixed(6)).then(function(response){
      
        truckDataService.response.data = response.data;

        geoDataService.updateMarkers();
    });
    
    
  });

  //Food types filter




}]);
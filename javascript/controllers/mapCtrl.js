truckApp.controller('mapCtrl',  [ '$scope', '$http',
                                    'truckDataService',
                                    'geoDataService', 
                                     function( $scope, $http,
                                            truckDataService,
                                            geoDataService
                                            ){


console.log("map controller run");



  $scope.map = L.map('map', geoDataService.response.map);

  geoDataService.response.map = $scope.map;

  $scope.markers = new L.LayerGroup().addTo($scope.map);

  geoDataService.response.markers = $scope.markers;

  $scope.cicles = new L.LayerGroup().addTo($scope.map);

  geoDataService.response.cicles = $scope.cicles;

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


  $scope.map.on('click', function(e) {
    
    geoDataService.response.center.longitude = Number(e.latlng.lng).toFixed(6);
     geoDataService.response.center.latitude = Number(e.latlng.lat).toFixed(6);


    
    truckDataService.getTruckData( Number(e.latlng.lng).toFixed(6), Number(e.latlng.lat).toFixed(6)).then(function(response){
      
        truckDataService.response.data = response.data;

        geoDataService.updateMarkers();
    });
    
    
  });

  

  // $scope.$watch( 'center', function() {
  //      console.log('hey, center has changed!');
  //      $scope.map.panTo(geoDataService.response.map.center);
  //    });
  //Initial map with 560 mission st trucks

  // $http.get('locations.json').success(function(data) {
  //           // Loop through the 'locations' and place markers on the map
  //           angular.forEach(data, function(truck){
  //               var marker = L.marker([parseFloat(truck.latitude).toFixed(4), parseFloat(truck.longitude).toFixed(4)]).bindPopup('<p>'+truck.applicant+'</p><p>'+truck.dayshours+'<br />'+truck.fooditems+'</p>').addTo($scope.map);

  //           });
  //       });

 

  // $scope.addMarkersToMap = function(markers){
  //   $scope.map.center = new L.LatLng(geoDataService.response.center.latitude, geoDataService.response.center.longitude);
  //   angular.forEach(markers, function(marker){
  //         marker.addTo($scope.map);
  //       });
  // };

  // $scope.removeMarkersFromMap = function(markers){
  //   angular.forEach(markers, function(marker){
  //     marker.removeFrom($scope.map);
  //   });
  // };


  

  // $scope.mapData = truckDataService.response;

  // $scope.$watch( 'mapData', function() {
  //      console.log('hey, mapData has changed!');
  //      $scope.removeMarkersFromMap(mapDataService.response.markers);
  //      mapDataService.updateMarkers();
  //      $scope.addMarkersToMap(mapDataService.response.markers);
  //  });
 // $scope.updateMarkers();
 //  Read in the Location/Events file 
 //  $http.get('locations.json').success(function(data) {
 //      // Loop through the 'locations' and place markers on the map
 //  });
      

// //truckDataService.getMission();

// //Making controller variables update automaticly when service variable changes
// $scope.geoData = geoDataService.response;
// $scope.truckData = truckDataService.response;


// $scope.getTrucks = function(){
  
//   geoDataService.getGeoData($scope.searchInput.address+" San Francisco");
  
// };

    


}]);
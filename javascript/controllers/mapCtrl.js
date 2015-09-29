trackApp.controller('mapCtrl',  [ '$scope', '$http',
                                    'trackDataService',
                                    'geoDataService',
                                     function( $scope, $http,
                                            trackDataService,
                                            geoDataService
                                            ){


console.log("map controller run");

  var popup = L.popup();
  // var southWest = new L.LatLng(40.60092,-74.173508);
  // var northEast = new L.LatLng(40.874843,-73.825035);         
  // var bounds = new L.LatLngBounds(southWest, northEast);
  // L.Icon.Default.imagePath = './img';

 $scope.map = L.map('map', {
      center: new L.LatLng(geoDataService.response.center.longitude, geoDataService.response.center.latitude),
      zoom: 13,
      // maxBounds: bounds,
      maxZoom: 30,
      minZoom: 0
  });

  // create the tile layer with correct attribution
  var tilesURL='http://tile.stamen.com/terrain/{z}/{x}/{y}.png';
  // var tilesAttrib='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.';
  var tiles = new L.TileLayer(tilesURL, {
      // attribution: tilesAttrib,
      opacity: 0.7,
      detectRetina: true,
      unloadInvisibleTiles: true,
      updateWhenIdle: true,
      reuseTiles: true
  });
  tiles.addTo($scope.map);

  //Initial map with 560 mission st tracks

  $http.get('locations.json').success(function(data) {
            // Loop through the 'locations' and place markers on the map
            angular.forEach(data, function(track){
                var marker = L.marker([parseFloat(track.latitude).toFixed(4), parseFloat(track.longitude).toFixed(4)]).addTo($scope.map).bindPopup('<p>'+track.applicant+'</p><p>'+track.dayshours+'<br />'+track.fooditems+'</p>').openPopup();

            });
        });

  // var marker = new Array();


  
  $scope.updateMarkers = function(){
      $scope.map.center = new L.LatLng(geoDataService.response.center.latitude, geoDataService.response.center.longitude);
      
     console.log("Updating data", trackDataService.response.data);
      angular.forEach(trackDataService.response.data, function(track){
          
          var marker = L.marker([track.latitude, track.longitude]).addTo($scope.map).bindPopup('A food track.').openPopup();

      });
  };

  // $scope.mapData = trackDataService.response.data;

  // $scope.$watch( 'mapData', function() {
  //      console.log('hey, mapData has changed!');
  //      $scope.updateMarkers();
  //  });
 // $scope.updateMarkers();
 //  Read in the Location/Events file 
 //  $http.get('locations.json').success(function(data) {
 //      // Loop through the 'locations' and place markers on the map
 //  });
      

// //trackDataService.getMission();

// //Making controller variables update automaticly when service variable changes
// $scope.geoData = geoDataService.response;
// $scope.trackData = trackDataService.response;


// $scope.getTracks = function(){
  
//   geoDataService.getGeoData($scope.searchInput.address+" San Francisco");
  
// };

    


}]);
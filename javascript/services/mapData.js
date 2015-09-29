truckApp.factory('mapDataService',  ['$http', 'truckDataService', 'geoDataService',function($http, truckDataService, geoDataService){

  var obj={};


  obj.response = {
    map: {},
    markers: {},
    center: {longitude: 37.78,
              latitude: -122.41}
  };


  obj.response.map = L.map('map', {
      center: new L.LatLng(geoDataService.response.center.longitude, geoDataService.response.center.latitude),
      zoom: 13,
      maxZoom: 30,
      minZoom: 0
  });

  obj.response.markers = new L.LayerGroup().addTo(map);


  obj.updateMarkers = function(){
      console.log("Update markers was run");
      //Removing old markers
      obj.response.markers.clearLayers();

      //Adding new markers to array
      angular.forEach(truckDataService.response.data, function(truck){
          var new_marker = L.marker([truck.latitude, truck.longitude]).bindPopup('<p>'+truck.applicant+'</p><p>'+truck.dayshours+'<br />'+truck.fooditems+'</p>').addTo(obj.response.markers);

      });
  };

  return obj;

}]);
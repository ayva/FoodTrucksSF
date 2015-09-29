truckApp.factory('geoDataService',  ['$http', 'truckDataService', function($http, truckDataService){
  console.log("geoData service run");
  var obj={};

  obj.response = {
    data: {features: [{place_name: "560 Mission St.",
                      center: ["37.788865","-122.399359"]
                    }]
                  },
    center: {longitude: 37.78,
              latitude: -122.41},
    map: {
      center: new L.LatLng(37.78, -122.41),
      zoom: 15,
      // maxBounds: bounds,
      maxZoom: 16,
      minZoom: 14
    },
    markers: {},
    cicles: {}

  };

  // obj.GetCoords() {
  //      $http.get('http://ipinfo.io/json').
  //        success(function(data) {
  //          var coords = data.loc.split(",")

  //          obj.response.center.longitude = Number(coords[0]);
  //          obj.response.center.latitude = Number(coords[1]);
  //          console.log(coords)
  //          if ( obj.response.center.longitude > 39 || 
  //               obj.response.center.longitude < 37 || 
  //               obj.response.center.latitude > -121 || 
  //               obj.response.center.latitude < -124 ) {
  //               obj.response.center.longitude = 37.78;
  //               obj.response.center.latitude = -122.41;
  //           }
  //      });
  // };
  


  obj.mainIcon = L.Icon.extend({
    options: {
        //shadowUrl: 'leaf-shadow.png',
        iconSize:     [40, 40],
        //shadowSize:   [50, 64],
        iconAnchor:   [20, 20],
        //shadowAnchor: [4, 62],
        popupAnchor:  [0, -15]
    }
});

  obj.truckIcon = new obj.mainIcon({iconUrl: 'images/foodtruck-icon-web.png'});
    // redIcon = new LeafIcon({iconUrl: 'leaf-red.png'}),
    // orangeIcon = new LeafIcon({iconUrl: 'leaf-orange.png'});

// L.marker([51.5, -0.09], {icon: truckIcon}).addTo(map).bindPopup("I am a green leaf.");
// L.marker([51.495, -0.083], {icon: redIcon}).addTo(map).bindPopup("I am a red leaf.");
// L.marker([51.49, -0.1], {icon: orangeIcon}).addTo(map).bindPopup("I am an orange leaf.");



  obj.updateMarkers = function(){
      console.log("Update markers was run");
      //Removing old markers and cicle
      obj.response.markers.clearLayers();
      obj.response.cicles.clearLayers();
      
      //Moving map center and adding cicle
      var latlng = {lat: obj.response.center.latitude,
                    lng: obj.response.center.longitude}; 

      obj.response.map.panTo(latlng);

        L.circle(latlng, 400, {
          color: '#2E73B4',
          fillColor: '#000',
          fillOpacity: 0.2
        }).addTo(obj.response.cicles);
   

      //Adding new markers to array
      angular.forEach(truckDataService.response.data, function(truck){
          var new_marker = L.marker([truck.latitude, truck.longitude], {icon: obj.truckIcon}).bindPopup('<h4>'+truck.applicant+'</h4><p>'+truck.dayshours+'<br />'+truck.fooditems+'</p>').addTo(obj.response.markers);
          console.log("New marker added")

      });
  };

  obj.getGeoData = function(address){
    $http({
            method: 'GET',
            url: 'https://api.mapbox.com/v4/geocode/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYXl2YSIsImEiOiJjaWY0OXE0NWkzNXc1c2ttMms0dzlkdHI0In0.-KmRnZgS76kFVEcBCNJG6Q'
          }).then(function successCallback(response) {
              //Address coords
              obj.response.data = response.data;

              //Saving coordinates from provided address
              obj.response.center.longitude = Number(obj.response.data.features[0].center[0]);
              obj.response.center.latitude = Number(obj.response.data.features[0].center[1]);



              //Getting trucks for provided coordinates
              obj.getTrucks();



        }, function errorCallback(response) {
          console.log("No geo info returned");
   
        });
  };


  obj.getTrucks = function(){


    truckDataService.getTruckData(obj.response.center.longitude, obj.response.center.latitude).then(function successCallback(response) {
        //Keeping response in service obj
          truckDataService.response.data = response.data;
        
        //Updating map with new trucks
          obj.updateMarkers();
       
        }, function errorCallback(response) {
          console.log("No food trucks returned");
        });
  };

  return obj;
}]);

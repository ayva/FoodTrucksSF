truckApp.factory('geoDataService',  ['$http', 'truckDataService', function($http, truckDataService){
  console.log("geoData service run");

  var obj={};

  obj.geoip = {
    longitude: -122.41,
    latitude: 37.78
  },

  obj.response = {
    data: {features: [{place_name: "560 Mission St.",
                      center: ["37.788865","-122.399359"]
                    }]
                  },
    center: {longitude: obj.geoip.longitude,
              latitude: obj.geoip.latitude},
    map: {
      center: new L.LatLng(obj.geoip.latitude,obj.geoip.longitude),
      zoom: 15,
      maxZoom: 16,
      minZoom: 14
    },
    markers: {},
    cicles: {}

  };

  


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

  obj.userIcon = new obj.mainIcon({iconUrl: 'images/user.png'});
  
  obj.addCenter = function(latlng){
    var new_marker = L.marker([latlng.lat, latlng.lng], {icon: obj.userIcon}).bindPopup('<h4> You are here </h4>').addTo(obj.response.markers);
  };




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
    

      obj.addCenter(latlng);

      //Adding new markers to array
      angular.forEach(truckDataService.response.data, function(truck){
          var new_marker = L.marker([truck.latitude, truck.longitude], {icon: obj.truckIcon}).bindPopup('<h4>'+truck.applicant+'</h4><p>'+truck.dayshours+'<br />'+truck.fooditems+'</p>').addTo(obj.response.markers);
          console.log("New marker added")

      });
  };
  //Search by address
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

  //Search by coords
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

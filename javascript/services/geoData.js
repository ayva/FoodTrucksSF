trackApp.factory('geoDataService',  ['$http', 'trackDataService', function($http, trackDataService){

  var obj={};

// geoData.data.features[0].place_name
  obj.response = {
    data: {features: [{place_name: "560 Mission St.",
                      center: ["37.78","-122.41"]
                    }]
                  },
    center: {longitude: 37.78,
              latitude: -122.41}
  };

  obj.getGeoData = function(address){
    $http({
            method: 'GET',
            url: 'https://api.mapbox.com/v4/geocode/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYXl2YSIsImEiOiJjaWY0OXE0NWkzNXc1c2ttMms0dzlkdHI0In0.-KmRnZgS76kFVEcBCNJG6Q'
          }).then(function successCallback(response) {
          obj.response.data = response.data;

          //Making request for info about track in this area
          obj.response.center.longitude = obj.response.data.features[0].center[0];
          obj.response.center.latitude = obj.response.data.features[0].center[1];
          console.log("calling track Service");
          obj.getTracks(obj.response.center.longitude, obj.response.center.latitude);

        }, function errorCallback(response) {
          console.log("No geo info returned");
   
        });
  };

  obj.getTracks = function(lon, lat){
    trackDataService.getTrackData(lon, lat).then(function successCallback(response) {
        console.log("track service got tracks");
        //Keeping response in service obj
          trackDataService.response.data = response.data;
          
          
        }, function errorCallback(response) {
          console.log("No food tracks returned");
        });
  };

  return obj;
}]);

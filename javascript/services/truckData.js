truckApp.factory('truckDataService', ['$http', function($http){

  var obj={};

  obj.response = {
    data: {}
  };

  obj.getMission = function(){
    return $http({
        method: 'GET',
        url: 'https://data.sfgov.org/resource/rqzj-sfat.json?$where=within_circle(location,%2037.78,%20-122.41,%20200)',
        }).then(function successCallback(response) {
        
        //Adding default data
          obj.response.data = response.data;
          
          
        }, function errorCallback(response) {
          console.log("No food trucks on Mission");
        });

  };

  obj.getTruckData = function(lon, lat){
      console.log("requesting",lon,lat)
  
      return $http({
        method: 'GET',
        url: 'https://data.sfgov.org/resource/rqzj-sfat.json?$$app_token=DnYp4Ddomgi28TQ13Gaajo7vN&$where=within_circle(location,%20'+lat+',%20'+lon+',%20400)&status=APPROVED'
      });

      // https://data.sfgov.org/resource/rqzj-sfat.json?$where=within_circle(location,%2037.78,%20-122.41,%201000)&status=APPROVED&$limit=1

      //?$$app_token=Aq3YmLPKTNnsTzf18ky49Nf3p
      //?$limit=100&$offset=0 100 results per page starting 0
      //?$where=within_box(location, 41.885001, -87.645939, 41.867011, -87.618516)



  };

  return obj;
  
}]);
truckApp.factory('truckDataService', ['$http', function($http){

  var obj={};

  obj.response = {
    data: {}
  };


  obj.getTruckData = function(lon, lat){
      console.log("requesting",lon,lat)
  
      return $http({
        method: 'GET',
        url: 'https://data.sfgov.org/resource/rqzj-sfat.json?$$app_token=DnYp4Ddomgi28TQ13Gaajo7vN&$where=within_circle(location,%20'+lat+',%20'+lon+',%20400)&status=APPROVED'
      });


  };

  return obj;
  
}]);
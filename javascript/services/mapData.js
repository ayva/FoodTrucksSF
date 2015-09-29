trackApp.factory('mapDataService',  ['$http', 'trackDataService', function($http, trackDataService){

  var obj={};


  obj.response = {
    markers: [],
    center: {longitude: 37.78,
              latitude: -122.41}
  };

  return obj;

}]);
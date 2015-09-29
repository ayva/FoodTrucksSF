truckApp.controller('truckCtrl',  [ '$scope',
                                    'truckDataService',
                                    'geoDataService',
                                     function( $scope,
                                            truckDataService,
                                            geoDataService
                                            ){


console.log("truck controller run");
//truckDataService.getMission();

//Making controller variables update automaticly when service variable changes
$scope.geoData = geoDataService.response;
$scope.truckData = truckDataService.response;


$scope.getTrucks = function(){
  
  geoDataService.getGeoData($scope.searchInput.address+" San Francisco");
  
};

    


}]);
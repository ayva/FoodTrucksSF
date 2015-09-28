trackApp.controller('trackCtrl',  [ '$scope',
                                    'trackDataService',
                                    'geoDataService',
                                     function( $scope,
                                            trackDataService,
                                            geoDataService
                                            ){


console.log("track controller run");
trackDataService.getMission();

//Making controller variables update automaticly when service variable changes
$scope.geoData = geoDataService.response;
$scope.trackData = trackDataService.response;


$scope.getTracks = function(){
  
  geoDataService.getGeoData($scope.searchInput.address+" San Francisco");
  
};

    


}]);
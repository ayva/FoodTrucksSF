truckApp.directive('map', function($http){
return {
    restrict: 'E',
    replace: true,
    template: '<div>Here is the map</div>',
    controller: 'mapCtrl',
    scope: true
    
    };

});
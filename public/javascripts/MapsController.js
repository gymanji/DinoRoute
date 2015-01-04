
var app = angular.module('MapsApp', []);

app.controller('MapsController', ['$scope', function($scope) {

	//Unix epoch time conversion
	//currentTime = Math.round(new Date().getTime()/1000.0);
	//console.log('Current time = ' + currentTime);

	//Initialized vars for testing
	$scope.origin = "Atlanta, GA";
	$scope.destination = "Dunwoody, GA";

	$scope.getDirections = function () {

		//Request details
		DirectionsRequest = {
			origin: $scope.origin,
			destination: $scope.destination,
			provideRouteAlternatives: false,
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.IMPERIAL
		}

		//Actual API request
		var directionsService = new google.maps.DirectionsService();
		directionsService.route(DirectionsRequest, function(result, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				console.log(status);
				console.log(result);

				$scope.status = status;
				$scope.result = result;
			} else {
				console.log(status);
			}
		});
	}
}]);





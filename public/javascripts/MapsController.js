var fs = require('fs');

var app = angular.module('MapsApp', []);

app.controller('MapsController', ['$scope', function($scope) {

	// Initialized vars for testing
	$scope.origin = "Atlanta, GA";
	$scope.destination = "Charleston, SC";

	$scope.getDirections = function () {

		//Unix epoch time conversion
		currentTime = Math.round(new Date().getTime()/1000.0);
		console.log('Current time = ' + currentTime);

		// Request details
		DirectionsRequest = {
			origin: $scope.origin,
			destination: $scope.destination,
			provideRouteAlternatives: false,
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.IMPERIAL
		}

		// API request
		var directionsService = new google.maps.DirectionsService();
		directionsService.route(DirectionsRequest, function(result, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				$scope.status = status;
				$scope.result = result;
				$scope.$digest();
			} else {
				console.log(status);
			}
		});
	}
}]);


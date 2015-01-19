
var app = angular.module('MapsApp', ['ngResource']);

app.controller('MapsController', ['$scope', function($scope) {

	// Initialized vars for testing
	$scope.origin = "1155 Perimeter Center W, Atlanta, GA 30338";
	$scope.destination = "10900 Westside Parkway Alpharetta, GA 30009";

	$scope.getDirections = function () {

		// Request details
		DirectionsRequest = {
			origin: $scope.origin,
			destination: $scope.destination,
			provideRouteAlternatives: false,
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.IMPERIAL
		};

		// API request
		var directionsService = new google.maps.DirectionsService();
		directionsService.route(DirectionsRequest, function(result, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				$scope.status = status;
				$scope.result = result;

				// Route data (may use this later for turn-by-turn)
				$scope.routeLegCount = result.routes[0].legs[0].steps.length;
				var routeDetailSteps = result.routes[0].legs[0];
				$scope.routeList = [];

				for (var i = 0; i < $scope.routeLegCount; i++) {
					$scope.routeList.push(routeDetailSteps.steps[i].instructions);
				}
				//console.log($scope.routeList);

				//Unix epoch time conversion
				$scope.tripDuration = result.routes[0].legs[0].duration.value;
				var currentTime = Math.round(new Date().getTime()/1000.0);
				var arrivalEpochTime = currentTime + $scope.tripDuration;
				var arrivalReadableTime = new Date(arrivalEpochTime * 1000);
				$scope.arrivalTimeFormatted = arrivalReadableTime.toLocaleString();
				$scope.arrivalTimeFormatted2 = arrivalReadableTime.toLocaleTimeString();
				$scope.$digest();
			} else {
				console.log(status);
			}
		});
	}
}]);


app.controller('NotifyCtrl', ['$scope', '$http', function($scope, $http) {

	// Vars initialized for testing
	$scope.msgTo = "";
	$scope.msgBody = "Houston, we have a problem.";

	// Call server side Twilio functionality
	$scope.notify = function(msgTo, msgBody) {
		data2 = [msgTo, msgBody];

		$http.post('/sendMessage', data2).success(function(data, status) {
			console.log('data: ' + data);
			console.log('status: ' + status);
		}).error(function(data, status) {
			console.log('error data: ' + data);
			console.log('error status: ' + status);
		});
	}
}]);



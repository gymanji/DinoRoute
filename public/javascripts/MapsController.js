//var SMSconfig = require('../../SMSconfig.log');

var app = angular.module('MapsApp', []);

app.controller('MapsController', ['$scope', function($scope) {

	// Initialized vars for testing
	$scope.origin = "Atlanta, GA";
	$scope.destination = "Roswell, GA";

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
				$scope.tripDuration = result.routes[0].legs[0].duration.value;
				console.log('tripDuration: ' + $scope.tripDuration);
				$scope.$digest();
			} else {
				console.log(status);
			}
		});

		//Unix epoch time conversion
		$scope.currentTime = Math.round(new Date().getTime()/1000.0);
		console.log('currentTime: ' + $scope.currentTime);
		$scope.arrivalEpochTime = $scope.currentTime + $scope.tripDuration;
		$scope.arrivalReadableTime = new Date($scope.arrivalEpochTime * 1000);

	}
}]);

app.controller('NotifyCtrl', ['$scope','$http', function($scope, $http) {

	// Reading account contents from local file
	$http.get('content/SMSconfig.log').success(function(data) {
		$scope.SMSconfig = data;
		console.log(SMSconfig);

		var accountSid = SMSconfig.accountSid;
		var authToken = SMSconfig.authToken;
	});

	// Function to send SMS
	$scope.notify = function() {

		var client = require('twilio')(accountSid, authToken);

		client.sms.messages.create({
			body: "DinoRoute Message 2 ;)",
			to: "+15713931277",
			from: SMSconfig.sender
		}, function(err, message) {
			process.stdout.write(message.sid);
			console.log(err);
		});

	}
}]);


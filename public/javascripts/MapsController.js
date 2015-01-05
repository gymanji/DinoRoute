
var app = angular.module('MapsApp', []);

app.controller('MapsController', ['$scope', function($scope) {

	// Initialized vars for testing
	$scope.origin = "Atlanta, GA";
	$scope.destination = "Charleston, SC";

	$scope.getDirections = function () {

		//Unix epoch time conversion
		$scope.currentTime = Math.round(new Date().getTime()/1000.0);


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

app.controller('DinoNotifier', ['$scope', 'ReadFile', function($scope, ReadFile) {

	//$scope.sendSMS = function() {

		// Account Credentials
		$scope.readSensitiveFile = function() {

			console.log("readSensitiveFile button clicked");
			var fs = require('fs');
			var path = "//Users/Zach/Development/GitHub Repos/DinoRoute/DinoRoute/text.log";
			var options = {encoding: 'utf8', flag: 'r'};

			fs.readFile(path, options, function(err, data) {
				if (err) {
					return console.log(err);
				}
				var parsed = JSON.parse(data);
				console.log(parsed.accountSid);
				console.log(parsed.authToken);
				$scope.accountSid = parsed.accountSid;
				$scope.authToken = parsed.authToken;
				$scope.$digest();
			});
		}

		// Twilio module and REST client
		//var client = require('twilio')(accountSid, authToken);
		//
		//client.messages.create({
		//  from: "+12019571381",
		//}), function(err, message) {
		//  console.log(message.sid);
		//}
	//}
}]);

app.factory('ReadFile', ['$scope' ,'$http', function($scope, $http) {

	var path = "//Users/Zach/Development/GitHub Repos/DinoRoute/DinoRoute/text.log";

	$http.get(path).
		success(function(data2, status2) {
			$scope.data2 = data2;
			$scope.status2 = status2;
		}).
		error(function(data, status) {
			$scope.data2 = data2;
			$scope.status2 = status2;
		});

}]);
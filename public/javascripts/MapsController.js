
var app = angular.module('MapsApp', []);

var client = require('twilio')('ACb', '0f7');

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

//app.controller('DinoNotifier', ['$scope', 'ReadFile', function($scope, ReadFile) {
//
//	//$scope.sendSMS = function() {
//
//		// Account Credentials
//		$scope.readSensitiveFile = function() {
//
//			console.log("readSensitiveFile button clicked");
//			var fs = require('fs');
//			var path = "//Users/Zach/Development/GitHub Repos/DinoRoute/DinoRoute/text.log";
//			var options = {encoding: 'utf8', flag: 'r'};
//
//			fs.readFile(path, options, function(err, data) {
//				if (err) {
//					return console.log(err);
//				}
//				var parsed = JSON.parse(data);
//				console.log(parsed.accountSid);
//				console.log(parsed.authToken);
//				$scope.accountSid = parsed.accountSid;
//				$scope.authToken = parsed.authToken;
//				$scope.$digest();
//			});
//		}
//}]);

app.controller('NotifyCtrl', ['$scope', function($scope) {

	$scope.testText = "This is from NotifyCtrl";
	//var client = new twilio.RestClient('ACb', '0f78');

	$scope.notify = function() {
		client.sendMessage({

			to:'+1',
			from: '+12019571381',
			body: 'Twilio text!'

		}, function(err, responseData) {

			if (!err) {

				console.log(responseData.from);
				console.log(responseData.body);

			}
		});
	}

}]);

//app.factory('ReadFile', ['$scope' ,'$http', function($scope, $http) {
//
//	var path = "//Users/Zach/Development/GitHub Repos/DinoRoute/DinoRoute/text.log";
//
//	$http.get(path).
//		success(function(data2, status2) {
//			$scope.data2 = data2;
//			$scope.status2 = status2;
//		}).
//		error(function(data, status) {
//			$scope.data2 = data2;
//			$scope.status2 = status2;
//		});
//
//}]);
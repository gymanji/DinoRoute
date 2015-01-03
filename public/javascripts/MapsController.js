var app = angular.module('MapsApp', []);

app.controller('MapsController', ['$scope', '$http', function($scope, $http) {
	$scope.getMapDirections = function () {

	base_url = "https://maps.googleapis.com/maps/api/directions/json?origin=Atlanta,GA&destination=Marietta,GA&key=AIzaSyDDKB4EBWfJj0i2qb-Qul3qxfv9D7Mk_D0";
	base_url2 = "https://maps.googleapis.com/maps/api/directions/json?origin=Atlanta,GA&destination=Marietta,GA&key=AIzaSyDDKB4EBWfJj0i2qb-Qul3qxfv9D7Mk_D0?callback=JSON_CALLBACK";
	method = 'GET'
	method2 = 'JSONP'

	$http({method: method, url: base_url}).
		success(function(data, status) {
			$scope.status = status;
			$scope.data = data;
		}).
		error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;
		});
	}
}]);



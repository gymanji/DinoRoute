var app = angular.module('MapsApp', []);

app.controller('MapsController', ['$scope', '$http', function($scope, $http) {
	$scope.getMapDirections = function () {

	base_url = "https://maps.googleapis.com/maps/api/directions/json?origin=Atlanta,GA&destination=Marietta,GA&key=AIzaSyDDKB4EBWfJj0i2qb-Qul3qxfv9D7Mk_D0";

	// var req = {
 //            method: 'GET',
 //            url: 'https://maps.googleapis.com/maps/api/directions/json?origin=Atlanta,GA&destination=Marietta,GA&key=AIzaSyDDKB4EBWfJj0i2qb-Qul3qxfv9D7Mk_D0',
 //            headers: {
 //               'Content-Type': undefined
 //               },
 //             data: { test: 'test' }
	//  }

	 // CORS request
	// $http.jsonp(base_url + "&callback=JSON_CALLBACK").success(function(data, status) {
	// 	$scope.status = status;
	// 	$scope.data = data
	// 	console.log(data);
	// }).error(function(data, status) {
	// 	$scope.data = data || "Request failed";
	// 	$scope.status = status;
	// });
	// }

	// GET request
	$http.get(base_url).success(function(data, status) {
		$scope.status = status;
		$scope.data = data
		console.log(data);
	}).error(function(data, status) {
		$scope.data = data || "Request failed";
		$scope.status = status;
	});
	}

}]);



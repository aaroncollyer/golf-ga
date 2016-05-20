var myFirebaseRef = new Firebase("https://golf-ga.firebaseIO.com/");


// create angular app
var validationApp = angular.module('validationApp', ['fieldMatch']);
//Field Match directive
angular.module('fieldMatch', [])
		.directive('fieldMatch', ["$parse", function($parse) {
				return {
						require: 'ngModel',
						link: function(scope, elem, attrs, ctrl) {
								var me = $parse(attrs.ngModel);
								var matchTo = $parse(attrs.fieldMatch);
								scope.$watchGroup([me, matchTo], function(newValues, oldValues) {
										ctrl.$setValidity('fieldmatch', me(scope) === matchTo(scope));
								}, true);
						}
				}
		}]);
//Run material design lite
validationApp.run(function($rootScope, $timeout) {
		$rootScope.$on('$viewContentLoaded', function(event) {
				$timeout(function() {
						componentHandler.upgradeAllRegistered();
				}, 0);
		});
		$rootScope.render = {
				header: true,
				aside: true
		}
});
// create angular controller
validationApp.controller('mainController', function($scope) {
		$scope.formStatus = '';
		// function to submit the form after all validation has occurred			
		$scope.submit = function() {
				// check to make sure the form is completely valid
				if ($scope.form.$invalid) {
						angular.forEach($scope.form.$error, function(field) {
								angular.forEach(field, function(errorField) {
										errorField.$setTouched();
								})
						});
						$scope.formStatus = "Form is invalid.";
						console.log("Form is invalid.");
				} else {
						$scope.formStatus = "Form is valid.";
						console.log("Form is valid.");
						console.log($scope.data);
				}
		};
});
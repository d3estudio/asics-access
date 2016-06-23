angular.module('asics').controller('AuthCtrl', [
	'$scope',
	'$state',
	'$mdToast',
	'auth',
	function ($scope, $state, $mdToast, auth) {
		$scope.user = {};

		$scope.$watch('error', function() {
			if(	!$scope.error ) return;

			var message = $scope.error.message,
				toast = $mdToast.simple()
					.textContent(message)
					.position('top')
					.hideDelay(3000)
					.theme('error-toast');

			if(message != '')
				$mdToast.show(toast);
		});

		$scope.logIn = function () {
			// auth.logIn($scope.user, function (error) {
			// 	if (error) {
			// 		$scope.error = error;
			// 	} else {
			// 		$state.go('admin.invitation');
			// 	}
			// });
			$state.go('admin');
		};

	}]);

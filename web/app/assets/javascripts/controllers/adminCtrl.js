angular.module('asics').controller('AdminCtrl', [
	'$mdEditDialog',
	'$mdToast',
	'$q',
	'$scope',
	'$timeout',
	'$state',
	'$stateParams',
	'admin',
	function ($mdEditDialog, $mdToast, $q, $scope, $timeout, $state, $stateParams, admin) {
		$scope.asics = [];

		$scope.$on('$viewContentLoaded', function () {
			updateGuestForm();
		});

		$scope.guestType = 'athlete';

		$scope.updateForm = function () {
			updateGuestForm();
		};

		function updateGuestForm() {
			if ($scope.guestType === 'athlete') {
				$scope.isAthlete = true;
				$('.other-field').hide();
				$('.athlete-field').show(200);
			} else {
				$scope.isAthlete = false;
				$('.athlete-field').hide();
				$('.other-field').show(200);
			}
		}

		$scope.inviteGuest = function () {
			$mdToast.show(
				$mdToast.simple()
					.textContent("Convite enviado com sucesso!")
					.position('top right')
					.hideDelay(3000)
					.theme('error-toast')
				);
		};
	}]);

angular.module('asics').directive('notBizarreAmericanDate', function ($window) {
	return {
		require: '^ngModel',
		restrict: 'A',
		link: function (scope, elm, attrs, ctrl) {

			ctrl.$formatters.unshift(function (modelValue) {
				// console.log(modelValue);
				if (!modelValue) return "";

				var varDate = new Date(modelValue);
				var string = ("0" + varDate.getDate()).slice(-2)
					+ "/" + ("0" + (varDate.getMonth() + 1)).slice(-2)
					+ "/" + varDate.getFullYear();
				// console.log(modelValue);
				// console.log(string);
				return string;
			});

			ctrl.$parsers.unshift(function (viewValue) {
				if (!viewValue) return "";

				viewValue = viewValue.slice(0, 10);
				var transformedInput = viewValue.replace(/[^0-9.]/g, "");

				var newViewString = transformedInput.slice(0, 2);
				if (transformedInput.length > 2)
					newViewString += "/" + transformedInput.slice(2, 4);
				if (transformedInput.length > 4)
					newViewString += "/" + transformedInput.slice(4);

				if (transformedInput != newViewString) {
					ctrl.$setViewValue(newViewString);
					ctrl.$render();
				}

				var m = transformedInput.match(/^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])(19|20)[0-9][0-9]$/g);
				if (m) {
					ctrl.$setValidity("pattern", true);
					var from = viewValue.split("/");
					return new Date(from[2], from[1] - 1, from[0]);
				} else {
					ctrl.$setValidity("pattern", false);
					return null;
				}
			});
		}
	};
});

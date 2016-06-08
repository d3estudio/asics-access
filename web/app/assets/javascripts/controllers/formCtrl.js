angular.module('asics').controller('FormCtrl', [
    '$scope',
    '$mdDialog',
    '$mdToast',
    'form',
    function ($scope, $mdDialog, $mdToast, form) {
		$scope.result = '';
		$scope.hideHints = false;
        $scope.confInfo = form.confInfo;
        $scope.formData = {};
		$scope.details = '';

		function initForm() {
			$scope.formData = {
				responsible: {
					email: '',
					name: '',
					birthday: '',
					phone: '',
					cellphone: '',
					address: ''
				},
				entries: []
			}
		}
		initForm();

		$scope.addEntry = function () {
			$scope.formData.entries.push({
				name: '',
				birthday: ''
			});
		};

		$scope.subscribeGroup = function () {
			showDialog($scope.formData);
		};

		function showErrorToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(3000)
                    .theme('error-toast')
            );
        }

        function clearEmptyEntries() {
			$scope.formData.entries = $scope.formData.entries.filter(function(entry) {
				return entry.name != '' && entry.birthday != '';
			})
        }

		function subscribeCallback(err, data) {
			if(err) showErrorToast(err.message);
			else {
				showDialog();
				initForm();

				$scope.userForm.$setPristine();
				$scope.userForm.address.$touched = false;
				$scope.userForm.email.$touched = false;
				$scope.userForm.phone.$touched = false;
				$scope.userForm.cellphone.$touched = false;
				$scope.userForm.name.$touched = false;
				$scope.userForm.birthday.$touched = false;

				$scope.hideHints = false;
			}
		}

        function showDialog(data) {
			clearEmptyEntries();

            var template = data?'tabDialog.review.html':'tabDialog.confirm.html';
            $mdDialog.show({
                controller: DialogController,
                templateUrl: template,
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                locals : {
                    data : data
                }
            }).then(function() {
                //confirm callback
                // form.subscribeGroup(data, subscribeCallback);
            }, function() {
                //cancel callback
            });
        }

		form.injectControllerDepedencies(showErrorToast, showDialog);

		$( document ).ready(function() {
			setTimeout(function () {
				$('input#input-address').attr('placeholder',null)
			}, 1500)
		});
    }]);

function DialogController($scope, $mdDialog, data) {
    $scope.formData = data;

    $scope.confirm = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}

angular.module('asics')
    .filter('to_html', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

angular.module('asics')
	.directive('namesOnly', function(){
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, modelCtrl) {

				modelCtrl.$parsers.push(function (inputValue) {
					var transformedInput = inputValue ? inputValue.replace(/[^a-zA-ZáéíóúàâêôãõöüçÁÉÍÓÚÀÂÊÖÔÃÕÜÇ'\- ]/g,'') : null;

					if (transformedInput!=inputValue) {
						modelCtrl.$setViewValue(transformedInput);
						modelCtrl.$render();
					}

					return transformedInput;
				});
			}
		};
	});

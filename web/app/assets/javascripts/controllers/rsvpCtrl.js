angular.module('asics').controller('RsvpCtrl', [
    '$scope',
    '$mdDialog',
    '$mdToast',
    'rsvp',
    function ($scope, $mdDialog, $mdToast, rsvp) {
        $scope.result = '';
        $scope.hideHints = false;
        $scope.rsvp = rsvp;
        $scope.formData = {};
        
        $scope.$on('$viewContentLoaded', function () {
            clearForm();
        });

        $scope.confirmRSVP = function (err, data) {
            if (err) showErrorToast(err.message);
            else {
                showDialog($scope.formData);
                clearForm();

            }

        };

        function clearForm() {
            $scope.formData = {
                guest: {
                    email: '',
                    name: '',
                    birthday: '',
                    phone: ''
                },
                isVegan: false,
                dontDrink: false
            };
            $scope.userForm.$setPristine();
            $scope.userForm.email.$touched = false;
            $scope.userForm.phone.$touched = false;
            $scope.userForm.name.$touched = false;
            $scope.userForm.birthday.$touched = false;
            $scope.hideHints = false;
        }

        function showErrorToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(3000)
                    .theme('error-toast')
            );
        }

        function showDialog(data) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'tabDialog.confirm.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                locals: {
                    data: data
                }
            }).then(function () {
                //confirm callback
                // form.subscribeGroup(data, subscribeCallback);
            }, function () {
                //cancel callback
            });
        }
    }]);

function DialogController($scope, $mdDialog, data) {
    $scope.formData = data;

    $scope.confirm = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}

angular.module('asics')
    .filter('to_html', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);

angular.module('asics')
    .directive('namesOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {

                modelCtrl.$parsers.push(function (inputValue) {
                    var transformedInput = inputValue ? inputValue.replace(/[^a-zA-ZáéíóúàâêôãõöüçÁÉÍÓÚÀÂÊÖÔÃÕÜÇ'\- ]/g, '') : null;

                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    });

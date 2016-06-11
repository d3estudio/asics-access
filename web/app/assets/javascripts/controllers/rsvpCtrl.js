angular.module('asics').controller('RsvpCtrl', [
    '$scope',
    '$mdDialog',
    '$mdToast',
    '$stateParams',
    'rsvp',
    function ($scope, $mdDialog, $mdToast, $stateParams, rsvp) {
        $scope.result = '';
        $scope.guest = {};

        $scope.confirmInvitation = function () {
            rsvp.postConfirm($scope.guest)
                .then(showDialog)
                .catch(errorToast);
        };



        function errorToast(error) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Erro ao confirmar presença: " + error)
                    .position('top right')
                    .hideDelay(3000)
                    .theme('error-toast')
            );
        }

        function showDialog(guest) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'tabDialog.confirm.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                locals: {
                    data: guest
                }
            }).then(function () {
                //confirm callback
                // form.subscribeGroup(data, subscribeCallback);
            }, function () {
                //cancel callback
            });
        }



        $scope.$on('$viewContentLoaded', function () {
            clearForm();
        });

        function clearForm() {
            $scope.guest = {
                invite_token: $stateParams.token,
                email: $stateParams.email,
                name: '',
                birthday: '',
                phone: '',
                isVegan: false,
                dontDrink: false
            };
            $scope.userForm.$setPristine();
            $scope.userForm.email.$touched = false;
            $scope.userForm.name.$touched = false;
            $scope.userForm.birthday.$touched = false;
        }
    }]);


function DialogController($scope, $mdDialog, data) {
    $scope.guest = data;

    $scope.confirm = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}


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

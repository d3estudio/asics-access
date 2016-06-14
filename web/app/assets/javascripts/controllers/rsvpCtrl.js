angular.module('asics').controller('RsvpCtrl', [
    '$scope',
    '$state',
    '$mdToast',
    '$stateParams',
    'rsvp',
    function ($scope, $state, $mdToast, $stateParams, rsvp) {
        $scope.result = '';
        $scope.guest = {};

        $scope.confirmInvitation = function () {
            showQrcode($scope.guest)
            // rsvp.postConfirm($scope.guest)
            //     .then(showQrcode)
            //     .catch(errorToast);
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
        
        function showQrcode(data) {
            $state.go('.confirmed');
            // $state.go("rsvp.confirmed", {location: true, notify: false, reload: false})
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
                isVegan: false,
                dontDrink: false
            };
            if ($scope.userForm) {
                $scope.userForm.$setPristine();
                $scope.userForm.email.$touched = false;
                $scope.userForm.name.$touched = false;
                $scope.userForm.birthday.$touched = false;
            }
        }
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

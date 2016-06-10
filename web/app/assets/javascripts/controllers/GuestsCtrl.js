angular.module('asics').controller('GuestsCtrl', [
    '$mdToast',
    '$q',
    '$scope',
    '$state',
    '$stateParams',
    'admin',
    function ($mdToast, $q, $scope, $state, $stateParams, admin) {
        $scope.guest = {};

        $scope.guestType = 'athlete';



        $scope.inviteGuest = function () {
            admin.postInvite($scope.guest)
                .then(successToast)
                .catch(errorToast)
        };



        $scope.$on('$viewContentLoaded', function () {
            updateGuestForm();
            clearForm();
        });

        $scope.updateForm = function () {
            updateGuestForm();
        };

        function errorToast(error) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Erro ao enviar convite: " + error)
                    .position('top right')
                    .hideDelay(3000)
                    .theme('error-toast')
            );
        }

        function successToast(guest) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Convite para " + guest.name + " enviado com sucesso!")
                    .position('top right')
                    .hideDelay(3000)
                    .theme('error-toast')
            );
        }

        function clearForm() {
            $scope.guest = {
                email: '',
                name: '',
                occupation: ''
            };

            $scope.adminForm.$setPristine();
            $scope.adminForm.athlete.$touched = false;
            $scope.adminForm.name.$touched = false;
            $scope.adminForm.email.$touched = false;
            $scope.adminForm.occupation.$touched = false;
        }

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
    }]);


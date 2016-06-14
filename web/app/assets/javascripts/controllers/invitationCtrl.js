angular.module('asics').controller('InvitationCtrl', [
    '$mdToast',
    '$q',
    '$scope',
    '$state',
    '$stateParams',
    'admin',
    function ($mdToast, $q, $scope, $state, $stateParams, admin) {
        $scope.guest = {};


        $scope.inviteGuest = function () {
            admin.postInvite($scope.guest)
                .then(successToast)
                .catch(errorToast)
        };



        $scope.$on('$viewContentLoaded', function () {
            clearForm();
        });

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
            console.log(guest);
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
            $scope.adminForm.name.$touched = false;
            $scope.adminForm.email.$touched = false;
            $scope.adminForm.occupation.$touched = false;
        }
    }]);


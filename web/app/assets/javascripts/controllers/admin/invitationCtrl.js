angular.module('asics').controller('InvitationCtrl', [
    '$mdToast',
    '$q',
    '$scope',
    '$state',
    '$stateParams',
    'admin',
    function ($mdToast, $q, $scope, $state, $stateParams, admin) {
        $scope.guest = {};
        $scope.isAthlete = false;
        $scope.occupations = [
            'Atleta',
            'Staff de treinamento',
            'Federação/NOC',
            'Mídia',
            'Família/Amigo de atleta',
            'Diretor de corrida',
            'Representante do atleta',
            'Outro'
        ];

        $scope.inviteGuest = function () {
            admin.postInvite($scope.guest)
                .then(successToast)
                .catch(errorToast)
        };


        $scope.$on('$viewContentLoaded', function () {
            clearForm();
        });

        function errorToast(error) {
            console.error(error);

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
                occupation: '',
                language: 'PT'
            };

            $scope.adminForm.$setPristine();
            $scope.adminForm.name.$touched = false;
            $scope.adminForm.email.$touched = false;
            $scope.adminForm.occupation.$touched = false;
        }
    }]);


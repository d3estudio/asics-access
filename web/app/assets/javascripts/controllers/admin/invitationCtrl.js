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

        $scope.athletes = [
            'Jordan Ernest BURROUGHS',
            'Saori YOSHIDA',
            'Yoshihide Kiryu',
            'Chirstophe Lemaitre',
            'Floria Guei',
            'Yohan Diniz',
            'Queen Harrison',
            'Candace Hill',
            'Lolo Jones',
            'Veronica Shanti Pereira',
            'Jieshi Neo',
            'Jared Tallent',
            'Bruno Rezende',
            'Gael Monfils',
            'CoCo Vandeweghe',
            'Steve Johnson',
            'Vasek Pospisil',
            'Gwen Jorgensen',
            'Kerri Walsh',
            'Ramu Tokashiki',
            'Alexandra Priscila do Nascimento'
        ];

        $scope.inviteGuest = function () {
            if ($scope.isAthlete)
                $scope.guest.occupation = 'Atleta Asics';
            admin.postInvite($scope.guest)
                .then(onInviteSuccess)
                .catch(errorToast)
            console.log($scope.guest);
        };

        function onInviteSuccess(guest) {
            successToast(guest);
            clearForm();
        }

        function errorToast(error) {
            console.error(error);

            $mdToast.show(
                $mdToast.simple()
                    .textContent("Erro ao enviar convite: " + error)
                    .position('top right')
                    .hideDelay(4000)
                    .theme('error-toast')
            );
        }

        function successToast(guest) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Convite para " + guest.name + " enviado com sucesso!")
                    .position('top right')
                    .hideDelay(4000)
                    .theme('success-toast')
            );
            clearForm();
        }

        function clearForm() {
            $scope.guest = {
                email: '',
                name: '',
                occupation: '',
                language: 'PT'
            };

            $scope.adminForm.$setPristine();
            $scope.adminForm.email.$setUntouched();

            if($scope.adminForm.name)
                $scope.adminForm.name.$setUntouched();
            if($scope.adminForm.occupation)
                $scope.adminForm.occupation.$setUntouched();
        }

        $scope.$on('$viewContentLoaded', function () {
            clearForm();
        });
    }
]);

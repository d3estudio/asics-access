angular.module('asics').controller('GuestsCtrl', [
    '$mdToast',
    '$q',
    '$scope',
    'admin',
    function ($mdToast, $q, $scope, admin) {
        $scope.guests = [];

        admin.getGuests()
            .then(readGuests)
            .catch(errorToast);


        function readGuests(result) {
            angular.copy(result.guests, $scope.guests)
        }

        function errorToast(error) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Erro ao enviar convite: " + error)
                    .position('top right')
                    .hideDelay(3000)
                    .theme('error-toast')
            );
        }
    }]);


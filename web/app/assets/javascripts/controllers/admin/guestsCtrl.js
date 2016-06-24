angular.module('asics').controller('GuestsCtrl', [
    '$mdToast',
    '$q',
    '$scope',
    'admin',
    function ($mdToast, $q, $scope, admin) {
        $scope.guests = [];

        $scope.count = {
            total: 0,
            athletes: 0,
            guests: 0
        };

        admin.getGuests()
            .then(readGuestsInformation)
            .catch(errorToast);

        function readGuestsInformation(result) {
            angular.copy(result.guests, $scope.guests);

            $scope.count.athletes = result.confirmed_athletes;
            $scope.count.guests = result.confirmed_guests;
            $scope.count.total = result.confirmed_athletes + result.confirmed_guests;
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


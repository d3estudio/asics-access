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
        $scope.cardIsClosed = true;

        $scope.openCloseCard = function () {
            if ($scope.cardIsClosed ? $scope.cardIsClosed = false : $scope.cardIsClosed = true);
        };

        var map = {};

        $scope.resendEmail = function (guest_id) {
            admin.postResendEmail(guest_id)
                .then(successToast)
                .catch(errorToast)
        };

        $scope.deleteGuest = function (guest_id) {
            admin.postDeleteGuest(guest_id)
                .then(onDeleteGuest)
                .catch(errorToast)
        };

        function onDeleteGuest(result) {
            $scope.guests.splice(map[result.guest.id], 1);
            map[result.guest.id] = undefined;
            successToast(result);
        }

        admin.getGuests()
            .then(readGuestsInformation)
            .catch(errorToast);

        function readGuestsInformation(result) {
            result.guests.forEach(mapObject);

            $scope.count.athletes = result.confirmed_athletes;
            $scope.count.guests = result.confirmed_guests;
            $scope.count.total = result.confirmed_athletes + result.confirmed_guests;
        }

        function mapObject(element, index) {
            map[element.id] = index;
            $scope.guests.push(element);
        }

        function successToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(3000)
                    .theme('success-toast')
            );
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


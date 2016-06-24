angular.module('asics').controller('RsvpCtrl', [
    '$scope',
    '$state',
    '$mdToast',
    '$stateParams',
    'rsvp',
    function ($scope, $state, $mdToast, $stateParams, rsvp) {
        $scope.result = '';
        $scope.guest = {};
        $scope.strings = {};


        rsvp.getGuestByToken($stateParams.token)
            .then(readGuest)
            .catch(console.log);


        function readGuest(guest) {
            angular.copy(guest, $scope.guest);
            console.log($scope.guest);
            angular.copy(strings[guest.language], $scope.strings);
            console.log($scope.strings);
        }


        $scope.confirmInvitation = function () {
            rsvp.postConfirm($scope.guest)
                .then(toStateConfirmed)
                .catch(errorToast);
        };

        function toStateConfirmed(response) {
            $state.go("rsvp.confirmed", {guest: response})
        }

        function errorToast(error) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Erro ao confirmar presença: " + error)
                    .position('top right')
                    .hideDelay(3000)
                    .theme('error-toast')
            );
        }
    }
]);

var strings = {
    EN: {
        formLabelName: "Name"
    },
    PT: {
        formLabelName: "Nome"
    }
};

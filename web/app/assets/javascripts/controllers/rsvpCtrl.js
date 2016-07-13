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
        $scope.isAthlete = false;

        rsvp.getGuestByToken($stateParams.token)
            .then(readGuest)
            .catch(onInvalidToken);

        function readGuest(guest) {
            if (guest.rsvp)
                return $state.go("rsvp.confirmed", {guest: guest})

            angular.copy(guest, $scope.guest);
            angular.copy(confirmStrings[guest.language], $scope.strings);

            if (guest.occupation == 'Atleta Asics')
                $scope.isAthlete = true;
        }

        function onInvalidToken() {
            $state.go('home');
        }

        $scope.confirmInvitation = function () {
            rsvp.postConfirm($scope.guest)
                .then(toStateConfirmed)
                .catch(errorToast);
        };
    }
]);

var confirmStrings = {
    EN: {
        hello: "Hello",
        formLabelGuest: "Click on the button below to confirm attendance.",
        formLabelMusic: "Which song makes you feel like a champion?",
        formErrorRequiredMusic: "Please, type the song name",
        formButtonConfirmPresence: "Confirm attendance"
    },
    PT: {
        hello: "Olá",
        formLabelGuest: "Clique no botão abaixo para cofirmar presença.",
        formLabelMusic: "Que música faz você se sentir como um campeão?",
        formErrorRequiredMusic: "Por favor, preencha o nome da música",
        formButtonConfirmPresence: "Confirmar presença"
    }
};

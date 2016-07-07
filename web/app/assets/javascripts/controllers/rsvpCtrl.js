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
            angular.copy(guest, $scope.guest);
            angular.copy(confirmStrings[guest.language], $scope.strings);

            if ($scope.guest.occupation === 'Atleta Asics') $scope.isAthlete = true;
        }

        function onInvalidToken() {
            $state.go('home');
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

var confirmStrings = {
    EN: {
        hello: "Hello",
        formLabelMusic: "Which song makes you feel like a champion?",
        formErrorRequiredMusic: "Please, type the song name",
        formButtonConfirmPresence: "Confirm presence"
    },
    PT: {
        hello: "Olá",
        formLabelMusic: "Que música faz você se sentir como um campeão?",
        formErrorRequiredMusic: "Por favor, preencha o nome da música",
        formButtonConfirmPresence: "Confirmar presença"
    }
};

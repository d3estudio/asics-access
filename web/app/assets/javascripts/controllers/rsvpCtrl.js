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
            angular.copy(confirmStrings[guest.language], $scope.strings);
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
        formLabelName: "Name",
        formErrorRequiredName: "Please, fill your name",
        formLabelEmail: "Email",
        formErrorRequiredEmail: "Please, fill your email address",
        formErrorPaternEmail: "Invalid email",
        formLabelBirthdate: "Birthdate",
        formErrorRequiredBirthdate: "Please, fill your birthdate",
        formLabelIsVegan: "I am vegan",
        formLabelDontDrink: "I do not drink alcohol",
        formButtonConfirmPresence: "Confirm presence"
    },
    PT: {
        formLabelName: "Nome",
        formErrorRequiredName: "Por favor, preencha seu nome",
        formLabelEmail: "Email",
        formErrorRequiredEmail: "Por favor, preencha seu email",
        formErrorPaternEmail: "Email inválido",
        formLabelBirthdate: "Data de nascimento",
        formErrorRequiredBirthdate: "Preencha sua data de nascimento",
        formLabelIsVegan: "Eu sou vegano",
        formLabelDontDrink: "Não bebo bebida alcólica",
        formButtonConfirmPresence: "Confirmar presença"
    }
};

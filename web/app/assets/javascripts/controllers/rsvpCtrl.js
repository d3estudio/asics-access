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
    $scope.bgImage = 'default';

    rsvp.getGuestByToken($stateParams.token)
        .then(readGuest)
        .catch(onInvalidToken);

    function readGuest(guest) {
      if (guest.rsvp)
        return toStateConfirmed(guest);

      angular.copy(guest, $scope.guest);
      angular.copy(confirmStrings[guest.language], $scope.strings);

      if (guest.occupation == 'Atleta Asics') {
        $scope.isAthlete = true;
        $scope.bgImage = 'athlete'        
      }
    }

    function onInvalidToken() {
      $state.go('home');
    }

    $scope.confirmInvitation = function () {
      rsvp.postConfirm($scope.guest)
          .then(toStateConfirmed)
          .catch(errorToast);
    };

    function toStateConfirmed(guest) {
      $state.go("rsvp.confirmed", {guest: guest})
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
    welcomeMessage: "We look forward to welcoming you at the ASICS Hub.",
    formLabelGuest: "Click on the button below to confirm attendance.",
    formLabelAthlete: "We want you to feel at home, so please answer this question before confirm your attendance.",
    formLabelMusic: "Which song makes you feel like a champion?",
    formErrorRequiredMusic: "Please, type the song name",
    formButtonConfirmPresence: "Confirm attendance"
  },
  PT: {
    hello: "Olá",
    welcomeMessage: "Estamos ansiosos para recebê-lo no ASICS Hub.",
    formLabelGuest: "Clique no botão abaixo para confirmar presença.",
    formLabelAthlete: "Nós queremos que você se sinta em casa, então por favor responda a esta pergunta antes de confirmar a sua presença.",
    formLabelMusic: "Que música faz você se sentir como um campeão?",
    formErrorRequiredMusic: "Por favor, preencha o nome da música",
    formButtonConfirmPresence: "Confirmar presença"
  }
};

angular.module('asics').controller('IndexCtrl', [
  '$scope',
  '$state',
  '$window',
  function ($scope, $state, $window) {

    $window.map = new google.maps.Map(document.getElementById('google-map'), {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 8
    });
  }
]);

var indexStrings = {
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

angular.module('asics').controller('IndexCtrl', [
  '$scope',
  '$state',
  '$window',
  'googlemaps',
  function ($scope, $state, $window, googlemaps) {

    console.log(124)
    // googlemaps.mapsInitialized
    //   .then(function(){
    //     map = new google.maps.Map(document.getElementById('google-map'), options);
    //   });


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

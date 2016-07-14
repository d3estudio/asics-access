angular.module('asics').controller('RsvpConfirmedCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  function ($scope, $state, $stateParams) {
    $scope.result = '';
    $scope.strings = {};
    $scope.guest = $stateParams.guest;
    $scope.isAthlete = false;
    $scope.bgImage = 'default';

    if ($scope.guest == null) $state.go('home');
    else angular.copy(confirmedStrings[$scope.guest.language], $scope.strings);

    if ($scope.guest.occupation == 'Atleta Asics') {
      $scope.isAthlete = true;
      $scope.bgImage = 'athlete'
    }

  }
]);

var confirmedStrings = {
  EN: {
    expression: "GREAT!",
    confirmedCodeMessage: "This code is your entry to the ASICS Hub.",
    reminderMessage: "Make sure you bring it with you.",
    emailMessage: "We just sent this code to your e-mail"
  },
  PT: {
    expression: "TUDO CERTO!",
    confirmedCodeMessage: "Esse é seu código para entrar no ASICS Hub",
    reminderMessage: "Certifique-se de trazê-lo com você.",
    emailMessage: "Já enviamos o código para seu email"
  }
};

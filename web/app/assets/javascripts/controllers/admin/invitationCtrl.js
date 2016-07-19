angular.module('asics').controller('InvitationCtrl', [
  '$mdToast',
  '$q',
  '$scope',
  '$state',
  '$stateParams',
  'admin',
  function ($mdToast, $q, $scope, $state, $stateParams, admin) {
    $scope.strings = {};
    $scope.language = $stateParams.language;
    $scope.guest = {};
    $scope.isAthlete = false;
    $scope.athleteGuest = {};

    angular.copy(adminInvitationStrings[$scope.language], $scope.strings);

    $scope.occupations = [
      'Atleta',
      'Staff de treinamento',
      'Federação / NOC oficial',
      'Mídia',
      'Família/Amigo de atleta',
      'Diretor de corrida',
      'Representante do atleta',
      'Outro'
    ];

    $scope.athletes = [
      'Jordan Ernest BURROUGHS',
      'Saori YOSHIDA',
      'Yoshihide Kiryu',
      'Chirstophe Lemaitre',
      'Floria Guei',
      'Yohan Diniz',
      'Queen Harrison',
      'Candace Hill',
      'Lolo Jones',
      'Veronica Shanti Pereira',
      'Jieshi Neo',
      'Jared Tallent',
      'Bruno Rezende',
      'Gael Monfils',
      'CoCo Vandeweghe',
      'Steve Johnson',
      'Vasek Pospisil',
      'Gwen Jorgensen',
      'Kerri Walsh',
      'Ramu Tokashiki',
      'Alexandra Priscila do Nascimento'
    ];

    $scope.inviteGuest = function () {
      if ($scope.isAthlete) {
        $scope.guest.occupation = 'Atleta Asics';
        $scope.guest.name = $scope.athleteGuest.name;
      }

      admin.postInvite($scope.guest)
        .then(onInviteSuccess)
        .catch(errorToast)
    };

    function onInviteSuccess(guest) {
      successToast(guest);
      clearForm();
    }

    function errorToast(error) {
      var errorString;

      if (error.error == "ValidationFailed")
        errorString = "Erro ao validar campo " + Object.keys(error.message)[0];
      else
        errorString = error.message;

      $mdToast.show(
        $mdToast.simple()
          .textContent(errorString)
          .position('top right')
          .hideDelay(4000)
          .theme('error-toast')
      );
    }

    function successToast(guest) {
      $mdToast.show(
        $mdToast.simple()
          .textContent("Convite para " + guest.name + " enviado com sucesso!")
          .position('top right')
          .hideDelay(4000)
          .theme('success-toast')
      );
      clearForm();
    }

    function clearForm() {
      $scope.guest = {
        email: '',
        name: '',
        occupation: '',
        language: 'PT'
      };

      $scope.athleteGuest = {
        name: ''
      };

      $scope.isAthlete = false;

      $scope.adminForm.$setPristine();
      $scope.adminForm.email.$setUntouched();

      if ($scope.adminForm.name)
        $scope.adminForm.name.$setUntouched();
      if ($scope.adminForm.occupation)
        $scope.adminForm.occupation.$setUntouched();
    }

    $scope.$on('$viewContentLoaded', function () {
      clearForm();
    });
  }
]);

var adminInvitationStrings = {
  EN: {
    newInvitation: "New invitation",
    title: "Hi, fill the fields below to invite someone for the Asics Hub.",
    asicsAthlete: "Asics Athlete",
    formName: "Name",
    formNameRequireError: "Please, fill the name",
    chooseAthlete: "Choose the athlete",
    formOccupationRequireError: "Please, choose the occupation of the guest",
    formEmail: "Email",
    formEmailRequiredError: "Please, fill the email",
    formEmailInvalidError: "Invalid email",
    formLanguage: "Language",
    formOccupation: "Occupation",
    formOccupationOption: "Choose the occupation of the guest",
    sendInvitation: "SEND INVITATION"
  },
  PT: {
    newInvitation: "Novo convite",
    title: "Olá, preencha os campos abaixo para convidar uma pessoa para o Asics Hub.",
    asicsAthlete: "Atleta Asics",
    formName: "Nome",
    formNameRequireError: "Por favor, preencha o nome",
    chooseAthlete: "Escolha o atleta",
    formOccupationRequireError: "Por favor, escolha a área de atuação do convidado",
    formEmail: "Email",
    formEmailRequiredError: "Por favor, preencha o email",
    formEmailInvalidError: "Email inválido",
    formLanguage: "Idioma",
    formOccupation: "Função",
    formOccupationOption: "Escolha a função do convidado",
    sendInvitation: "ENVIAR CONVITE"
  }
};

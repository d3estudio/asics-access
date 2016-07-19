angular.module('asics').controller('InvitationCtrl', [
  '$mdToast',
  '$q',
  '$scope',
  '$state',
  '$stateParams',
  'admin',
  'countries',
  function ($mdToast, $q, $scope, $state, $stateParams, admin, countries) {
    $scope.strings = {};
    $scope.occupations = [];
    $scope.countries = countries;
    $scope.language = $stateParams.language;
    $scope.guest = {};
    $scope.isAthlete = false;
    $scope.athleteGuest = {};

    // Get all strings
    angular.copy(adminInvitationStrings[$scope.language], $scope.strings);
    // Get all guest occupations
    angular.copy(occupationStrings[$scope.language], $scope.occupations);

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
      var postGuest = {};

      if ($scope.isAthlete) {
        postGuest.occupation = 'Atleta Asics';
        postGuest.name = $scope.athleteGuest.name;
      } else {
        postGuest.occupation = $scope.guest.occupation;
        postGuest.name = $scope.guest.name;
      }

      postGuest.language = $scope.guest.language;
      postGuest.email = $scope.guest.email;
      postGuest.country = countries.PT[$scope.guest.country_key];

      admin.postInvite(postGuest)
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
        language: 'PT',
        country_key: 'BR'
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
    title: "Hello! Fill the fields below to invite someone for the Asics Hub.",
    asicsAthlete: "Asics Athlete",
    formName: "Name",
    formNameRequireError: "Please, fill the name",
    chooseAthlete: "Choose the athlete",
    formOccupationRequireError: "Please, choose the occupation of the guest",
    formCountryRequireError: "Please, choose the country of the guest",
    formEmail: "Email",
    formEmailRequiredError: "Please, fill the email",
    formEmailInvalidError: "Invalid email",
    formLanguage: "Language",
    formOccupation: "Occupation",
    formOccupationOption: "Choose the occupation of the guest",
    formCountry: "Country",
    formCountryOption: "Guest country",
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
    formCountryRequireError: "Por favor, escolha o país do convidado",
    formEmail: "Email",
    formEmailRequiredError: "Por favor, preencha o email",
    formEmailInvalidError: "Email inválido",
    formLanguage: "Idioma",
    formOccupation: "Função",
    formOccupationOption: "Escolha a função do convidado",
    formCountry: "País",
    formCountryOption: "País do convidado",
    sendInvitation: "ENVIAR CONVITE"
  }
};

var occupationStrings = {
  PT: [
    'Atleta',
    'Staff de treinamento',
    'Federação / NOC oficial',
    'Mídia',
    'Família/Amigo de atleta',
    'Diretor de corrida',
    'Representante do atleta',
    'Outro'
  ],
  EN: [
    'Athlete',
    'Coaching staff',
    'Federation / NOC official',
    'Media',
    'Athlete Family / Friends',
    'Race Director',
    'Athlete Representatives',
    'Other'
  ]
};


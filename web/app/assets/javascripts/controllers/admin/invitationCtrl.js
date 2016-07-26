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
    $scope.csvInvitation = false;
    $scope.occupations = [];
    $scope.countries = countries;
    $scope.language = $stateParams.language;
    $scope.guest = {};
    $scope.isAthlete = false;
    $scope.athleteGuest = {};
    $scope.adminEmail = '';
    $scope.csvFileMessage = '';

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

    $scope.sendFile = function () {
      var email = $scope.adminEmail;
      var file = document.querySelector('#guestListFile').files[0];

      admin.postSendFile(email, file)
        .then(onImportFileSuccess)
        .catch(errorToast)
    };

    $scope.sendCsv = function () {
      var csv = document.querySelector('#inputCsvFile').files[0];

      admin.postSendCsvFile(csv)
        .then(onImportCsvSuccess)
        .catch(errorToast)
    };

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

    function onImportFileSuccess() {
      successImportFileToast();
      clearFileForm();
    }

    function onImportCsvSuccess(message) {
      console.log('CSV IMPORTADO COM SUCESSO');
      console.log(message);
      
      $scope.csvFileMessage = message;
    }

    function onInviteSuccess(guest) {
      successToast(guest);
      clearForm();
    }

    function errorToast(error) {
      var errorString;

      if (error.error == "ValidationFailed")
        errorString = "Error validating " + Object.keys(error.message)[0];
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
          .textContent("Invitation sent to " + guest.name)
          .position('top right')
          .hideDelay(4000)
          .theme('success-toast')
      );
      clearForm();
    }

    function successImportFileToast() {
      $mdToast.show(
        $mdToast.simple()
          .textContent("File imported! Wait for the email.")
          .position('top right')
          .hideDelay(4000)
          .theme('success-toast')
      );
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

      if (! $scope.adminForm) return;

      $scope.adminForm.$setPristine();
      $scope.adminForm.email.$setUntouched();

      if ($scope.adminForm.name)
        $scope.adminForm.name.$setUntouched();
      if ($scope.adminForm.occupation)
        $scope.adminForm.occupation.$setUntouched();
    }

    function clearFileForm() {

      if ($scope.adminEmail)
        $scope.adminEmail = '';
      if ($scope.file)
        $scope.file = '';
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
    csvTitle: "You can import a file with your guest list.",
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
    formCsvEmailInfo: "Once your file is process, a notification email will be sent to this address",
    formFile: "File",
    formFileRequiredError: "Please, insert your file",
    formFileSelect: "Choose your file",
    formFileSelected: "File selected",
    sendInvitation: "SEND INVITATION",
    sendCsvFile: "SEND FILE",
    importYouList: "Import your list",
    here: "here",
    manualInvite: "Invite manually"
  },
  PT: {
    newInvitation: "Novo convite",
    title: "Olá, preencha os campos abaixo para convidar uma pessoa para o Asics Hub.",
    csvTitle: "Você pode importar um arquivo com a lista de convidados.",
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
    formCsvEmailInfo: "Uma vez que seu arquivo for processado, um email de notificação será enviado para este endereço.",
    formFile: "Arquivo",
    formFileRequiredError: "Por favor, insira o arquivo",
    formFileSelect: "Selecionar um arquivo",
    formFileSelected: "Arquivo selecionado",
    sendInvitation: "ENVIAR CONVITE",
    sendCsvFile: "ENVIAR ARQUIVO",
    importYouList: "Importe sua lista",
    here: "aqui",
    manualInvite: "Convidar manualmente"
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

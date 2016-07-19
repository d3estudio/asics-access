angular.module('asics').controller('AdminCtrl', [
  '$scope',
  '$state',
  function ($scope, $state) {
    $scope.strings = {};
    $scope.language = 'EN';
    $scope.selectedTab = null;

    updateStrings();

    function updateStrings() {
      angular.copy(adminStrings[$scope.language], $scope.strings);
    }

    $scope.changeLanguage = function () {
      if ($scope.language == 'EN')
        $scope.language = 'PT';
      else
        $scope.language = 'EN';

      updateStrings();
    };

    $scope.$on('$stateChangeStart', function (event, toState, toParams) {
      toParams.language = $scope.language;
      updateSelectedTab(toState.name, toParams.language)
    });

    updateSelectedTab($state.current.name, $scope.language);

    function updateSelectedTab(stateName) {
      switch (stateName) {
        case 'admin.logs':
          $scope.selectedTab = 2;
          break;
        case 'admin.invitation':
          $scope.selectedTab = 1;
          break;
        default:
          $scope.selectedTab = 0
      }
    }
  }]);

var adminStrings = {
  EN: {
    guests: "Guests",
    invite: "Invite",
    logs: "Logs",
    language: "Language"
  },
  PT: {
    guests: "Convidados",
    invite: "Convidar",
    logs: "Acessos",
    language: "Idioma"
  }
};

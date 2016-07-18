angular.module('asics').controller('AdminCtrl', [
  '$scope',
  '$state',
  function ($scope, $state) {
    $scope.strings = {};
    $scope.language = 'EN';
    $scope.selectedTab = null;

    angular.copy(adminStrings[$scope.language], $scope.strings);

    $scope.$on('$stateChangeStart', function (event, toState) {
      updateSelectedTab(toState.name)
    });

    updateSelectedTab($state.current.name);

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
    logs: "Logs"
  },
  PT: {
    guests: "Convidados",
    invite: "Convidar",
    logs: "Acessos"
  }
};

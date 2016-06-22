angular.module('asics').controller('RsvpConfirmedCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    function ($scope, $state, $stateParams) {
        $scope.result = '';
        $scope.guest = $stateParams.guest;

        if($scope.guest == null) $state.go('home');
    }]);

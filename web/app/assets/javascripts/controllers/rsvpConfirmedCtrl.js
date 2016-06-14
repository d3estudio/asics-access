angular.module('asics').controller('RsvpConfirmedCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'rsvp',
    function ($scope, $state, $stateParams, rsvp) {
        $scope.result = '';
        $scope.guest = $stateParams.guest;
    }]);

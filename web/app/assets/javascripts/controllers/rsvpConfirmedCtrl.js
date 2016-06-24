angular.module('asics').controller('RsvpConfirmedCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    function ($scope, $state, $stateParams) {
        $scope.result = '';
        $scope.strings = {};
        $scope.guest = $stateParams.guest;

        if ($scope.guest == null) $state.go('home');
        else angular.copy(confirmedStrings[$scope.guest.language], $scope.strings);

    }
]);

var confirmedStrings = {
    EN: {
        confirmedCodeMessage: "this is your checkin code for the event"
    },
    PT: {
        confirmedCodeMessage: "esse é seu código para entrar no evento"
    }
};

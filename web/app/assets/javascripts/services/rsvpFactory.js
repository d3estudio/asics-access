angular.module('asics').factory('rsvp', ['$http', function ($http) {
    var o = {};

    o.postConfirm = function(guest) {
        return $http.post('/api/rsvp/confirm', guest)
            .then(
                function(response) {
                    return response.data.result
                },
                function (error) {
                    throw error.data.message
                }
            )
    };

    return o;
}]);

angular.module('asics').factory('admin', ['$http', function ($http) {
    var o = {};

    o.getAllAthletes = function () {
        return $http.get('/api/athlete/all')
            .then(
                function (response) {
                    return response.data
                },
                function (error) {
                    return {
                        error: error.data.message
                    }
                })
    };

    o.postInvite = function(guest) {
        return $http.post('/api/rsvp/invite', guest)
            .then(
                function(response) {
                    console.log("RESPONSE");
                    console.log(response);
                    return response.data.result
                },
                function (error) {
                    console.log("ERROR");
                    console.log(error);
                    return error.data.message
                }
            )
    };

    return o;

}]);

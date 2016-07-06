angular.module('asics').factory('admin', ['$http', function ($http) {
    var o = {
        logs: [],
        guests: []
    };

    o.getGuests = function () {
        return $http.get('/api/admin/guests/all').then(parseGuests, parseError);
    };

    o.getLogs = function () {
        return $http.get('/api/admin/logs/all').then(parseLogs, parseError);
    };

    o.postResendEmail = function (guest_id) {
        return $http.post('/api/admin/guests/email', { guest_id: guest_id }).then(parseSuccessMessage, parseError);
    };

    o.postDeleteGuest = function (guest_id) {
        return $http.post('/api/admin/guests/delete', { guest_id: guest_id }).then(parseSuccessMessage, parseError);
    };

    o.postInvite = function(guest) {
        return $http.post('/api/admin/invite', guest).then(parseSuccess, parseError);
    };

    o.postSearchLogs = function(searchString) {
        var post = { search_string: searchString };
        return $http.post('/api/admin/logs/search', post).then(parseSuccess, parseError);
    }

    function parseGuests(response) {
        var guests = JSON.parse(response.data.result.guests)
        angular.copy(guests, o.guests);
        return parseSuccess(response);
    };

    function parseLogs(response) {
        var logs = JSON.parse(response.data.result.logs)
        angular.copy(logs, o.logs);
        return parseSuccess(response);
    }

    function parseSuccessMessage(response) {
        return response.data.result.message;
    }

    function parseSuccess(response) {
        return response.data.result;
    }

    function parseError(error) {
        console.error(error);
        throw error.data.message;
    }

    return o;

}]);

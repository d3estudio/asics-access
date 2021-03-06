angular.module('asics').factory('admin', ['$http', function ($http) {
  var logsUpdatedAt;

  var o = {
    logs: [],
    guests: [],
    guestsCount: {}
  };

  o.getGuests = function () {
    return $http.get('/api/admin/guests/all').then(parseGuests, parseError);
  };

  o.getLogs = function () {
    var url = '/api/admin/logs/all';
    // var url = '/api/admin/logs/all' + (logsUpdatedAt ? '?since=' + logsUpdatedAt : '');
    return $http.get(url).then(parseLogs, parseError);
  };

  o.getReport = function (day) {
    return $http.get('/api/admin/report/byday?day=' + day).then(parseReport, parseError);
  };

  o.postResendEmail = function (guest_id) {
    return $http.post('/api/admin/guests/email', {guest_id: guest_id}).then(parseSuccess, parseError);
  };

  o.postDeleteGuest = function (guest_id) {
    return $http.post('/api/admin/guests/delete', {guest_id: guest_id}).then(parseSuccess, parseError);
  };

  o.postInvite = function (guest) {
    return $http.post('/api/admin/invite', guest).then(parseSuccess, parseErrorObject);
  };

  o.postCompanion = function (guest) {
    return $http.post('/api/admin/invite/companion', guest).then(parseSuccess, parseErrorObject);
  };

  o.postSearchLogs = function (searchString) {
    var post = {search_string: searchString};
    return $http.post('/api/admin/logs/search', post).then(parseSuccess, parseError);
  };

  o.postSearchGuests = function (searchString) {
    var post = {search_string: searchString};
    return $http.post('/api/admin/guests/search', post).then(parseSuccess, parseError);
  };

  o.postSendFile = function (email, file) {
    var formData = new FormData();

    formData.append("file", file);
    formData.append("email", email);

    return $http.post('/api/admin/spreadsheet/send', formData, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).then(parseSuccess, parseError);
  };

  o.postSendCsvFile = function (csv) {
    var formData = new FormData();

    formData.append("csv", csv);

    return $http.post('/api/admin/invite/csv', formData, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).then(parseSuccess, parseError);
  };

  function parseGuests(response) {
    var result = response.data.result;

    if (result.guests.length > 0)
      logsUpdatedAt = result.guests[result.guests.length - 1].created_at;

    angular.copy(result.guests, o.guests);
    angular.copy(result.count, o.guestsCount);
    return parseSuccess(response);
  };

  function parseLogs(response) {
    var logs = response.data.result.logs;
    angular.copy(logs, o.logs);
    return parseSuccess(response);
  }

  function parseReport(response) {
    var logs = response.data.result.logs;
    angular.copy(logs, o.logs);
    return parseSuccess(response);
  }

  function parseSuccessMessage(response) {
    console.log(response);
    return response.data.result.message;
  }

  function parseSuccess(response) {
    return response.data.result;
  }

  function parseError(error) {
    throw error.data.message;
  }

  function parseErrorObject(error) {
    throw error.data;
  }

  return o;

}]);

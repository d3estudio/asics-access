angular.module('asics').factory('form', ['$http', function ($http) {
	var o = {
		confInfo: {
			name: '',
			theme: '',
			address: '',
			period: '',
			vacancies: null,
			prelectors: [],

			contacts: [{
				name: '',
				emails: [],
				phones: []
			}],

			accommodations: [{
				name: '',
				phone: '',
				address: ''
			}],

			payment: {
				info: ''
			},

			infos: []
		}
	};

	var confID = '';
	var showToast, showDialog;

	o.subscribeGroup = function (form, callback) {
		form.conferenceId = confID;
		$http.post('/api/entry', form).success(function (data) {
			callback(null, data);
		}).error(callback);
	};

	o.injectControllerDepedencies = function (toast, dialog) {
		showToast = toast;
		showDialog = dialog
	};

	function getConference() {
		$http.get('/api/conference?id=' + confID).success(function (data) {
			angular.copy(data, o.confInfo);
		}).error(function (error) {
			showToast(error.message);
		});
	}

	function getAllConferences() {
		$http.get('/api/conference/all').success(function (data) {
			confID = data[0]._id;
			getConference();
		}).error(function (error) {
			showToast(error.message);
		});
	}

	getAllConferences();

	return o;

}]);
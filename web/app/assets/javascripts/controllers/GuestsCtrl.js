angular.module('asics').controller('GuestsCtrl', [
    '$mdToast',
    '$q',
    '$scope',
    '$state',
    '$stateParams',
    'admin',
    function ($mdToast, $q, $scope, $state, $stateParams, admin) {
        $scope.guests = [
            {
                email: 'jose@gmail.com',
                name: 'José Nunes',
                birthdate: '',
                occupation: 'athlete',
                isVegan: false,
                dontDrink: true
            },
            {
                email: 'maria@gmail.com',
                name: 'Maria do Carmo',
                birthdate: '',
                occupation: 'reporter',
                isVegan: true,
                dontDrink: true
            },
            {
                email: 'emilinho@gmail.com',
                name: 'Emilio Britto da Silva',
                birthdate: '',
                occupation: 'athlete',
                isVegan: false,
                dontDrink: false
            },
            {
                email: 'jose@gmail.com',
                name: 'José Nunes',
                birthdate: '',
                occupation: 'athlete',
                isVegan: false,
                dontDrink: true
            },
            {
                email: 'maria@gmail.com',
                name: 'Maria do Carmo',
                birthdate: '',
                occupation: 'reporter',
                isVegan: true,
                dontDrink: true
            },
            {
                email: 'emilinho@gmail.com',
                name: 'Emilio Britto da Silva',
                birthdate: '',
                occupation: 'athlete',
                isVegan: false,
                dontDrink: false
            },
            {
                email: 'jose@gmail.com',
                name: 'José Nunes',
                birthdate: '',
                occupation: 'athlete',
                isVegan: false,
                dontDrink: true
            },
            {
                email: 'maria@gmail.com',
                name: 'Maria do Carmo',
                birthdate: '',
                occupation: 'reporter',
                isVegan: true,
                dontDrink: true
            },
            {
                email: 'emilinho@gmail.com',
                name: 'Emilio Britto da Silva',
                birthdate: '',
                occupation: 'athlete',
                isVegan: false,
                dontDrink: false
            }
        ];


    }]);


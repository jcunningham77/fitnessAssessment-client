(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        

        return service;

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            var config = {
                headers : {
                    'application-id': 'CCD64643-E1D9-9AA2-FFF6-93992E5B9D00',
                   'secret-key':'266A1786-4FFA-FBAE-FFD7-53D4EEF7A700',
                   'application-type':'REST',
                   'Content-Type':'application/json'
                }
            }
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }


        function Create(user) {

            var config = {
                headers : {
                    'authorization': undefined,
                    'application-id': 'CCD64643-E1D9-9AA2-FFF6-93992E5B9D00',
                    'secret-key':'266A1786-4FFA-FBAE-FFD7-53D4EEF7A700',
                    'application-type':'REST',
                    'Content-Type':'application/json'
                }
            }
            console.log("create User - config =  " +JSON.stringify(config));
            console.log("about to register user w Backendless - user = " + JSON.stringify(user));
            return $http.post('https://api.backendless.com/v1/users/register', user,config).then(handleSuccess, handleError);

            // var user = new Backendless.User();
            // user.email = "jeff@BEL-JSTEST.com";
            // user.password = "my_super_password";
            // Backendless.UserService.register(user);


        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            //debugger;
            console.log("success = " + res);
            return  { success: true };
        }

        function handleError(res) {
            // debugger;
            console.log("the error was = " + res.data.message);
            var messageText = 'Unable to register user. User already exists.';
            return { success: false, message: res.data.message};
        }
    }

})();

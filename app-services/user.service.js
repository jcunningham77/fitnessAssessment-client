(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};
        var TAG = "UserService";

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        

        return service;

        function GetAll() {
            console.log(TAG + " - GetAll");
            var config = {
                headers : {
                    'authorization': undefined,
                    'application-id': 'CCD64643-E1D9-9AA2-FFF6-93992E5B9D00',
                    'secret-key':'266A1786-4FFA-FBAE-FFD7-53D4EEF7A700',
                    'application-type':'REST',
                    'Content-Type':'application/json'
                }
            }
            return $http.get('https://api.backendless.com/v1/data/Users?props=firstName,lastName,objectId', config).then(handleSuccess, handleError);
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            console.log(TAG + " - GetByUsername, username= " + username);
            var config = {
                headers : {
                    'authorization': undefined,
                    'application-id': 'CCD64643-E1D9-9AA2-FFF6-93992E5B9D00',
                    'secret-key':'266A1786-4FFA-FBAE-FFD7-53D4EEF7A700',
                    'application-type':'REST',
                    'Content-Type':'application/json'
                }
            }
            return $http.get('https://api.backendless.com/v1/data/Users?where=email%3D%27' + username + '\'&props=firstName,lastName,objectId', config).then(handleSuccess, handleError);
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
                        var config = {
                headers : {
                    'authorization': undefined,
                    'application-id': 'CCD64643-E1D9-9AA2-FFF6-93992E5B9D00',
                    'secret-key':'266A1786-4FFA-FBAE-FFD7-53D4EEF7A700',
                    'application-type':'REST',
                    'Content-Type':'application/json'
                }
            }
            return $http.delete('https://api.backendless.com/v1/data/Users/' + id,config).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            //debugger;
            console.log(TAG + " handleSuccess - res = " + JSON.stringify(res));
            return  { success: true, response: res };
        }

        function handleError(res) {
            // debugger;
            //console.log("the error was = " + res.data.message);
            var messageText = 'Unable to register user. User already exists.';
            return { success: false, message: res.data.message};
        }
    }

})();

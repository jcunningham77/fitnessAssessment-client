(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService','UserService'];
    function LoginController($location, AuthenticationService, FlashService, UserService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            //commenting out the callback
            // AuthenticationService.Login(vm.username, vm.password, function (response) {
            //     if (response.success) {
            //         debugger;
            //         console.log("loginController.login, response is success");
            //         AuthenticationService.SetCredentials(vm.username, vm.password);
            //         vm.dataLoading = false;
            //         $location.path('/');
            //     } else {
            //         console.log("loginController.login, response is failure");
            //         FlashService.Error(response.message);
            //         vm.dataLoading = false;
            //     }
            // });

            //use then
            AuthenticationService.Login(vm.username, vm.password)
                .then(function(response) {
                if (response.success) {
                    //debugger;
                    console.log("loginController.login, response is success");
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    vm.dataLoading = false;
                    $location.path('/');
                } else {
                    console.log("loginController.login, response is failure");
                    FlashService.Error(response.message);
                    vm.password="";
                    vm.dataLoading = false;
                }
            });          

            //the below code block works after explicitly removing the authorization header
            // UserService.LoginUser(vm.username,vm.password).then(function (response) {
            //         console.log("loginController = using new method to login user");
            //         if (response.success) {
            //             FlashService.Success('Registration successful', true);
            //             $location.path('/login');
            //         } else {
            //             // debugger;
            //             FlashService.Error(response.message);
            //             vm.dataLoading = false;
            //         }
            //     });
        };
    }

})();

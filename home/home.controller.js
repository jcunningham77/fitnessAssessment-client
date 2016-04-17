(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        var TAG = "HomeController";
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            console.log(TAG + " loadCurrentUser = $rootScope.globals.currentUser.username = " + $rootScope.globals.currentUser.username);
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (serviceResponse) {
                    // debugger;
                    vm.user= {
                        firstName: serviceResponse.response.data.data[0].firstName,
                        lastName: serviceResponse.response.data.data[0].lastName
                    }
                    //var userFromResponse;
                    // vm.user.firstName = serviceResponse.response.data.data[0].firstName;
                    // vm.user.lastName = serviceResponse.response.data.data[0].lastName;
                    //debugger;
                    
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (serviceResponse) {
                     // debugger;
                    var usersFromResponse = [];
                    for (var i=0;i<serviceResponse.response.data.data.length;i++){
                        usersFromResponse[i]={

                            firstName: serviceResponse.response.data.data[i].firstName,
                            lastName: serviceResponse.response.data.data[i].lastName,
                            objectId: serviceResponse.response.data.data[i].objectId
                        }
                        console.log("loadAllUsers = loaded the " + i + " user.");
                    }


                    vm.allUsers = usersFromResponse;
                    // debugger;
                });
        }

        function deleteUser(id) {
            console.log("deleteUser, id = " + id);
            UserService.Delete(id)
            .then(function () {
                console.log("deleted user, id = " + id + " now loadingUsersAgain");
                loadAllUsers();
            });
        }
    }

})();
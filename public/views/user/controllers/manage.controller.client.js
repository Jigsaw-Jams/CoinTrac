(function () {
    angular
        .module("CoinTrac")
        .controller("ManageController", ManageController);

        function ManageController($routeParams, $rootScope, $route, UserService, currentUser) {
            var model = this;
            model.currentUser = currentUser;
            model.createUser = createUser;
            model.updateUser = updateUser;
            model.deleteUser = deleteUser;
            model.setEditUser = setEditUser;

            function init() {
                $rootScope.currentUser = currentUser;
                findAllUsers();
            }
            init();

            function findAllUsers() {
                UserService
                    .findAllUsers()
                    .then(function (users) {
                        console.log(users);
                        model.allUsers = users;
                    }, function (err) {
                        console.log(err);
                    });
            }

            function setEditUser(user) {
                delete user.password;
                model.editUser = user;
            }


            function createUser(user) {
                UserService
                    .createUser(user)
                    .then(function (user) {
                        $route.reload();
                    })
            }


            function updateUser(userId, user) {
                UserService
                    .updateUser(user._id, user)
                    .then(function (user) {
                        $route.reload();
                    });
            }

            function deleteUser(userId) {
                UserService
                    .deleteUser(userId)
                    .then(function () {
                        $route.reload();
                        $('.modal').modal('hide');
                    })
            }
            
        }

})();
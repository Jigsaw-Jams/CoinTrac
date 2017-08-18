(function () {
    angular
        .module("CoinTrac")
        .controller("SettingsController", SettingsController);

        function SettingsController($rootScope, $route, $location, UserService, currentUser) {
            var model = this;
            model.updateUser = updateUser;
            model.deleteUser = deleteUser;
            
            function init() {
                model.currentUser = currentUser;
                $rootScope.currentUser = model.currentUser;
            }
            init();

            function updateUser(userId, user) {
                UserService
                    .updateUser(user._id, user)
                    .then( function (user) {
                        $route.reload();
                    });
            }

            function deleteUser(userId) {
                UserService
                    .deleteUser(userId)
                    .then(function () {
                        $('.modal').modal('hide');
                        $location.url("/");
                    })
            }
            
        }

})();
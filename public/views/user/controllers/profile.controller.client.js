(function () {
    angular
        .module("CoinTrac")
        .controller("ProfileController", ProfileController);

        function ProfileController($routeParams, UserService) {
            var model = this;
            model.userId = $routeParams["userId"];
            function init() {
                UserService
                    .findUserById(model.userId)
                    .then(function (user) {
                        model.user = user.data;
                    });
            }
            init();
            
        }

})();
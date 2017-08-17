(function () {
    angular
        .module("CoinTrac")
        .controller("SettingsController", SettingsController);

        function SettingsController($routeParams, UserService, currentUser) {
            var model = this;
            
            function init() {
                model.currentUser = currentUser;
            }
            init();
            
        }

})();
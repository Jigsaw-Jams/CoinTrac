(function() {
    angular
        .module("CoinTrac")     
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            // --------  Home  --------
           .when("/", {
                templateUrl : "views/home/templates/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            // -------- Search --------
            .when("/search", {
                templateUrl : "views/search/templates/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            // -------- Details --------
            .when("/details/:coinId", {
                templateUrl : "views/details/templates/details.view.client.html",
                controller: "DetailsController",
                controllerAs: "model"
            })
            // ------ Profile ----------
            .when("/profile/:userId", {
                templateUrl : "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            });
    }
})();
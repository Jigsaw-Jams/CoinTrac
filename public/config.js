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
                controllerAs: "model",
                resolve: { 
                    currentUser: getCurrentUser
                }
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
            .when("/profile", {
                templateUrl : "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: protectBehindLogin //todo
                }
            });


            // Return the currently logged in user, for changing context of things that can
            // be viewed by registered and unregisterd users. If no user page will load with result null
            function getCurrentUser(UserService, $q) {
                var deferred = $q.defer();
                
                UserService
                    .checkLogin()
                    .then(function (user) {
                        if(user === '0') {
                            deferred.resolve(null);
                        } else {
                            deferred.resolve(user);
                        }
                    });
                
                return deferred.promise;
            }


            // Redirect the the home page if the user is not currently logged in
            // if user is logged in allow them to access page and return user def

            // returns a promise so that resolve can run multiple async checks.
            function protectBehindLogin(UserService, $q, $location) {
                var deferred = $q.defer();

                UserService
                    .checkLogin()
                    .then(function (user) {
                        if(user === '0') {
                            deferred.reject();
                            $location.url("/");
                        } else {
                            deferred.resolve(user);
                        }
                    });

                return deferred.promise;
            }
    }
})();
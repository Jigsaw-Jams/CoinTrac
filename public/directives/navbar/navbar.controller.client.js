(function() {
    angular
        .module("coinTracDirectives")
        .controller("NavbarController", NavbarController);

        function NavbarController(UserService, $location, $rootScope, $scope, $route) {
            var navbarModel = this;
            navbarModel.login = login;
            navbarModel.logout = logout;
            navbarModel.createUser = createUser;

            function init() {
                navbarModel.currentUser = $rootScope.currentUser;
            }
            init();

            function createUser(user) {
                // remove existing error classes
                $('.form-group').removeClass('has-error');

                if (!user.email) {
                    $('#signup-email').addClass('has-error');
                    navbarModel.signupErrorMessage = "Sorry you must use a valid email address.";
                } else {
                    UserService
                        .findUserByUsername(user.username)
                        .then(function (foundUser) {
                            if (foundUser) {
                                navbarModel.signupErrorMessage = "Sorry this username is already taken, try another.";
                                $('#signup-username').addClass('has-error');
                            } else if (user.password != user.password2) {
                                $('#signup-password').addClass('has-error');
                                $('#signup-password2').addClass('has-error');
                                navbarModel.signupErrorMessage = "Sorry the passwords do not match.";
                            } else {
                                user.preferredCurrency = 'USD';
                                UserService
                                    .createUser(user)
                                    .then(function (response) {
                                        $rootScope.currentUser = response.data;
                                        login(user);
                                        $('.modal').modal('hide');
                                    });                          
                            }
                        })
                }                
            }
            
            function login(user) {
                UserService
                    .login(user.email, user.password)
                    .then(function (response) {
                        $('.modal').modal('hide');
                        $rootScope.currentUser = response.data;
                        $route.reload();
                    }, function (err) {
                        navbarModel.loginErrorMessage = "Sorry the email and password combination were not found.";
                    });
            }

            function logout() {
                UserService
                    .logout()
                    .then(function () {
                        $rootScope.currentUser = null;
                        $route.reload();
                    });
            }

        }
})();

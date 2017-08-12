(function() {
    angular
        .module("CoinTrac")
        .controller("HomeController", HomeController);

        function HomeController($location, $scope, HomeService, UserService) {
            var model = this;
            model.createUser = createUser;

            function init() {
                // Get the entire definition of the top 12 currencies
                HomeService.getCoins(12)
                    .then(function (coins) {
                        model.topTwelve = coins;
                    });
                
                // Get all available coin ids for the search functionality
                HomeService.getSearchSource()
                    .then(function (searchSource) {
                        $("#search").autocomplete({
                            source: searchSource,
                            select: function(event, ui) {
                                var id = ui.item.id;
                                $location.url('/details/' + id);
                                $scope.$apply(); // block is not triggered by part of angular so requires apply to execute
                            }
                        });
                    });

            }
            init();


            function createUser(user) {
                // remove existing error classes
                $('.form-group').removeClass('has-error');
                UserService
                    .findUserByUsername(user.username)
                    .then(function () {
                        model.errorMessage = "Sorry this username is already taken, try another.";
                        $('#signup-username').addClass('has-error');
                    }, function (err) {
                        // only do other validation if the username is not taken
                        if (!user.email) {
                            $('#signup-email').addClass('has-error');
                            model.errorMessage = "Sorry you must use a valid email address.";
                        } else if (user.password != user.password2) {
                            $('#signup-password').addClass('has-error');
                            $('#signup-password2').addClass('has-error');
                            model.errorMessage = "Sorry the passwords do not match.";
                        } else { // at this point user can be created
                            UserService
                            .createUser(user)
                            .then(function (response) {
                                console.log('created user check DB');
                                var user = response.data;
                                $('.modal').modal('hide');
                                $location.url("/profile/" + user._id);
                            });
                        }
                    });

            }




        }
})();
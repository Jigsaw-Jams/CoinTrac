(function() {
    angular
        .module("CoinTrac")
        .controller("HomeController", HomeController);

        function HomeController($location, $rootScope, $route, $scope, currentUser, CoinmarketcapService, UserService) {
            var model = this;
            model.followUser = followUser;
            model.unfollowUser = unfollowUser;

            function init() {
                $rootScope.currentUser = currentUser;
                model.currentUser = $rootScope.currentUser;
                
                // Get the entire definition of the top 12 currencies
                CoinmarketcapService.getCoins(12)
                    .then(function (coins) {
                        model.topTwelve = coins;
                    });
                
                // Get all available coin ids for the search functionality
                CoinmarketcapService.getSearchSource()
                    .then(function (searchSource) {
                        $("#search").autocomplete({
                            source: searchSource,
                            select: function(event, ui) {
                                var id = ui.item.value;
                                $location.url('/details/' + id);
                                $scope.$apply(); // block is not triggered by part of angular so requires apply to execute
                            }
                        });
                    });

        
                UserService.getUserlist(model.currentUser)
                    .then(function (userList) {
                        model.userList = userList;
                    })

                // if (model.currentUser) {
                //     UserService
                //        .getFollowingLists(model.currentUser._id)
                //         .then(function (followingLists) {
                //             model.followingLists = followingLists;
                //         });
                // }
                    
                $('#myTabs a').click(function (e) {
                    e.preventDefault()
                    $(this).tab('show');
                });
                    
            }
            init();


            function followUser(username) {
                UserService
                    .findUserByUsername(username)
                    .then(function (user) {
                        return UserService
                            .followUser(model.currentUser._id, user._id)
                            .then(function () {
                                $route.reload();
                            });
                    });
            }

            function unfollowUser(username) {
                UserService
                    .findUserByUsername(username)
                    .then(function (user) {
                        return UserService
                            .unfollowUser(model.currentUser._id, user._id)
                            .then(function () {
                                $route.reload();
                            });
                    });
            }


        }
})();
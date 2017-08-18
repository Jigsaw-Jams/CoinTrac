(function() {
    angular
        .module("CoinTrac")
        .controller("HomeController", HomeController);

        function HomeController($location, $rootScope, $scope, currentUser, CoinmarketcapService, UserService) {
            var model = this;

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

        }
})();
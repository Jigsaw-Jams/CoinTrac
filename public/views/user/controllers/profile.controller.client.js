(function () {
    angular
        .module("CoinTrac")
        .controller("ProfileController", ProfileController);

        function ProfileController($routeParams, $rootScope, $route, UserService, CoinmarketcapService, currentUser) {
            var model = this;
            model.removeCoinFromWatchlist = removeCoinFromWatchlist;
            
            function init() {
                model.currentUser = currentUser;
                $rootScope.currentUser = model.currentUser;
                
                if (currentUser.twitterHandle) {
                    twttr.ready(function () {
                        twttr.widgets.createTimeline(
                            {
                                sourceType: 'profile',
                                screenName: currentUser.twitterHandle
                            },
                            document.getElementById('twitter-timeline'),
                            {});
                    });
                }

                // Get all available coin ids for the search functionality
                CoinmarketcapService.getSearchSource()
                    .then(function (searchSource) {
                        $("#watchlist-search").autocomplete({
                            source: searchSource,
                            select: function(event, ui) {
                                console.log(event);
                                console.log(ui);
                                var id = ui.item.value;
                                console.log(id);
                                UserService
                                    .addCoinToWatchlist(currentUser._id, id)
                                    .then(function (data) {
                                        console.log(data);
                                        $route.reload();
                                    })
                                // $location.url('/details/' + id);
                                // $scope.$apply(); // block is not triggered by part of angular so requires apply to execute
                            }
                        });
                    });

            }
            init();

            function removeCoinFromWatchlist(coinId) {
                UserService
                    .removeCoinFromWatchlist(model.currentUser._id, coinId)
                    .then(function (data) {
                        console.log(data);
                        $route.reload();
                    })
            }
            
        }

})();
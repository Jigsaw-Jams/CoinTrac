(function() {
    angular
        .module("CoinTrac")
        .controller("HomeController", HomeController);

        function HomeController($location, $scope, HomeService) {
            var model = this;

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
                                $scope.$apply(); // not triggered by part of angular so requires apply to execute
                            }
                        });
                    });

            }
            init();

        }

})();
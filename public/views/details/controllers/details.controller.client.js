(function() {
    angular
        .module("CoinTrak")
        .controller("DetailsController", DetailsController);

        function DetailsController(DetailsService, $routeParams) {
            var model = this;
            var coinId = $routeParams['coinId'];

            function init() {
                DetailsService.getCoinDetails(coinId)
                    .then(function (coinDetails) {
                        model.coinDetails = coinDetails;
                    })
            }
            init();
 
        }

})();
(function() {
    angular
        .module("CoinTrac")
        .controller("DetailsController", DetailsController);

        function DetailsController(CoinmarketcapService, $routeParams) {
            var model = this;
            var coinId = $routeParams['coinId'];

            function init() {
                CoinmarketcapService.getCoinDetails(coinId)
                    .then(function (coinDetails) {
                        model.coinDetails = coinDetails;
                    })
            }
            init();
 
        }

})();
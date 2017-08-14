(function() {
    angular
        .module("coinTracDirectives")
        .controller("PortfolioController", PortfolioController);

        function PortfolioController($routeParams, HoldingService) {
            var portfolioModel = this;
            portfolioModel.userId = $routeParams['userId'];
            portfolioModel.createHolding = createHolding;


            function init() {
            }
            init();

            function createHolding() {
                var holding = {
                    coinId: 'BTC',
                    amount: 100,
                    fiatPerCoin: 22,
                    fiatCurrency: 'USD'
                };

                HoldingService
                    .createHolding("598e4e0217819930d2fbbfd9", holding)
                    .then(function (response) {
                        console.log('check db');
                    }, function (err) {
                        console.log(err);
                        console.log('err above');
                    });
            }




        }
})();
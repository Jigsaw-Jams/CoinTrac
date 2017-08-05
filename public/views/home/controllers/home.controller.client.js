(function() {
    angular
        .module("CoinTrak")
        .controller("HomeController", HomeController);

        function HomeController(HomeService) {
            var model = this;

            function init() {
                HomeService.getBitcoin()
                    .then(function (response) {
                        model.bitcoin = response.data[0];
                    });
                
                // TESTING ONLY //
                console.log(HomeService.getCoinsBySupply(8999999999));
                console.log(HomeService.getCoinById('bitcoin'));
            }
            init();
 
        }

})();
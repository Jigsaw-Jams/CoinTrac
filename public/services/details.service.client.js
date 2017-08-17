(function() {
    angular
        .module("CoinTrac")
        .factory("DetailsService", DetailsService);

    function DetailsService($http) {

        var api = {
            "getCoinDetails" : getCoinDetails,
            "calculateValueOfHoldings" : calculateValueOfHoldings
        };

        return api;

        function getCoinDetails(coinId) {
            var url = "https://api.coinmarketcap.com/v1/ticker/" + coinId + "/";

            return $http.get(url)
                .then(function (response) {
                    return response.data[0];
                });
        }


        function calculateValueOfHoldings(holdings) {
            var promises = [];
            var valueUsd = 0;
            var valueBtc = 0;

            for (h in holdings) {
                var holding = holdings[h];
                
                (function (currentHolding) {
                    promises.push(getCoinDetails(currentHolding.coinId)
                        .then(function (details) {
                            var priceUsd = details.price_usd;
                            var priceBtc = details.price_btc;
                            var amount = currentHolding.amount;
                            valueUsd = valueUsd + (priceUsd * amount);
                            valueBtc = valueBtc + (priceBtc * amount);
                        }))
                })(holding);

            }

            return Promise.all(promises)
                .then(function (data) {
                    return {
                        'usd': valueUsd,
                        'btc': valueBtc
                    };
                });


        }

    }
})();

(function() {
    angular
        .module("CoinTrac")
        .factory("CoinmarketcapService", CoinmarketcapService);

    function CoinmarketcapService($http) {

        var api = {
            "getCoins" : getCoins,
            "getCoinDetails" : getCoinDetails,
            "getSearchSource" : getSearchSource,
            "calculateValueOfHoldings" : calculateValueOfHoldings
        };

        return api;

        /**
         * Return all details about all coins, unless limit specified
         * 
         * @param {Number} limit - limit the number of coins returned to the top x coins based on limit
         */
        function getCoins(limit) {
            var url = `https://api.coinmarketcap.com/v1/ticker/?limit=${limit}`;
            return $http.get(url)
                .then(function (response) {
                    var coins = response.data;
                    return coins;
                });
        }

        /**
         * Return details about only the coinId specified
         * 
         * @param {*} coinId - the id of the coin to get details.
         */
        function getCoinDetails(coinId) {
            var url = "https://api.coinmarketcap.com/v1/ticker/" + coinId + "/";

            return $http.get(url)
                .then(function (response) {
                    return response.data[0];
                });
        }




        /**
         * Builds the source for the search functionality by querying CMC for 
         * details about all coins, and then creating a searchResult object for each.
         * These search results are used in many places for allowing users to search
         * all available crypto currencies. An icon is even included for each result.
         */
        function getSearchSource() {
            return getCoins()
                .then(function (coins) {
                    var searchSource = [];

                    // build the array of search result objects
                    for (coin in coins) {
                        currentCoin = coins[coin];
                        var id = currentCoin['id'];
                        var symbol = currentCoin['symbol'].toUpperCase();

                        var searchResult = {
                            // 'id'   : id, // TODO WHY WAS THIS HERE IT BROKE SOMETHING
                            'value': id,                  //used as the input value
                            'label': `${id} [${symbol}]`, //displayed in the autocomplete dropdown
                            'imgsrc' : `https://files.coinmarketcap.com/static/img/coins/16x16/${id}.png`
                        }

                        searchSource.push(searchResult);
                    }

                    return searchSource;
                });
        }

        /**
         * Calculate the USD and BTC value of a user's holdings based on
         * current pricing stats on CMC.
         * 
         * @param {Array} holdings 
         */
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

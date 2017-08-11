(function() {
    angular
        .module("CoinTrac")
        .factory("HomeService", HomeService);

    function HomeService($http) {
        var api = {
            "getCoins" : getCoins,
            "getSearchSource": getSearchSource
        };

        return api;


        function getCoins(limit) {
            var url = `https://api.coinmarketcap.com/v1/ticker/?limit=${limit}`;
            return $http.get(url)
                .then(function (response) {
                    var coins = response.data;
                    return coins;
                });

        }

        function getSearchSource() {
            var url = "https://api.coinmarketcap.com/v1/ticker/";
            return $http.get(url)
                .then(function (response) {
                    var coins = response.data;
                    var searchSource = [];

                    for (coin in coins) {
                        currentCoin = coins[coin];
                        var id = currentCoin['id'];
                        var symbol = currentCoin['symbol'].toUpperCase();

                        var searchResult = {
                            'id'   : id,
                            'label': `${id} [${symbol}]`
                        }

                        searchSource.push(searchResult);
                    }

                    return searchSource;
                });
        }
        // function getBitcoin() {
        //     var url = "https://api.coinmarketcap.com/v1/ticker/bitcoin/";
        //     return $http.get(url);
        // }

        // var api = {
        //     "getBitcoin" : getBitcoin,
        //     "getCoinById": getCoinById,
        //     "getCoinsBySupply": getCoinsBySupply
        // };
        // return api;

        // /**
        //  * Get the coin with the specificed @coinId
        //  * 
        //  * @param {*} coinId 
        //  */
        // function getCoinById(coinId) {
        //     for (var c in coins) {
        //         if(coins[c].id === coinId) {
        //             return coins[c];
        //         }
        //     }
        // }


        // /**
        //  * Get all coins with a supply above @supply
        //  * 
        //  * @param {number} supply 
        //  */
        // function getCoinsBySupply(supply) {
        //     var result = [];

        //     for (var c in coins) {
        //         if(coins[c].available_supply >= supply) {
        //             result.push(coins[c]);
        //         }
        //     }

        //     return result; 
        // }

    }
})();

(function() {
    angular
        .module("CoinTrak")
        .factory("SearchService", SearchService);

    function SearchService($http) {
        var api = {
            "getAllCoinIds" : getAllCoinIds,
        };
        return api;

        function getAllCoinIds() {
            var url = "https://api.coinmarketcap.com/v1/ticker/";
            return $http.get(url)
                .then(function (response) {
                    var coins = response.data;
                    var coinIds = [];

                    for (coin in coins) {
                        currentCoin = coins[coin];
                        coinIds.push(currentCoin['id']);
                    }

                    return coinIds;
                });
        }

    }
})();

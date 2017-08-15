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
     
    }
})();

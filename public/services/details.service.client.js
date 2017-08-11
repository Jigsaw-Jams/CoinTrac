(function() {
    angular
        .module("CoinTrac")
        .factory("DetailsService", DetailsService);

    function DetailsService($http) {

        var api = {
            "getCoinDetails" : getCoinDetails,
        };

        return api;

        function getCoinDetails(coinId) {
            var url = "https://api.coinmarketcap.com/v1/ticker/" + coinId + "/";

            return $http.get(url)
                .then(function (response) {
                    return response.data[0];
                });
        }

    }
})();

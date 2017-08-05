(function() {
    angular
        .module("CoinTrak")
        .factory("HomeService", HomeService);

    function HomeService($http) {
        var coins = [
            {
                "id": "bitcoin", 
                "name": "Bitcoin", 
                "symbol": "BTC", 
                "price_usd": "2975.25", 
                "available_supply": "16488925.0"
            }, 
            {
                "id": "ethereum", 
                "name": "Ethereum", 
                "symbol": "ETH", 
                "price_usd": "224.249", 
                "available_supply": "93787003.0", 
            }, 
            {
                "id": "ripple", 
                "name": "Ripple", 
                "symbol": "XRP", 
                "price_usd": "0.174175", 
                "available_supply": "38343841883.0", 
            }, 
            {
                "id": "bitcoin-cash", 
                "name": "Bitcoin Cash", 
                "symbol": "BCH", 
                "price_usd": "217.568", 
                "available_supply": "16482875.0", 
            }, 
            {
                "id": "litecoin", 
                "name": "Litecoin", 
                "symbol": "LTC", 
                "price_usd": "45.752", 
                "available_supply": "52319507.0"
            }, 
            {
                "id": "nem", 
                "name": "NEM", 
                "symbol": "XEM", 
                "price_usd": "0.222314", 
                "available_supply": "8999999999.0"
            }, 
            {
                "id": "ethereum-classic", 
                "name": "Ethereum Classic", 
                "symbol": "ETC", 
                "price_usd": "15.1048", 
                "available_supply": "94226300.0"
            }, 
            {
                "id": "dash",
                "name": "Dash",
                "symbol": "DASH",
                "price_usd": "187.172",
                "available_supply": "7472727.0"
            }, 
            {
                "id": "iota", 
                "name": "IOTA", 
                "symbol": "MIOTA", 
                "price_usd": "0.380045",
                "available_supply": "2779530283.0"
            }, 
            {
                "id": "monero", 
                "name": "Monero", 
                "symbol": "XMR", 
                "price_usd": "45.4643", 
                "available_supply": "14886077.0",
            }, 
        ];

        var api = {
            "getBitcoin" : getBitcoin,
            "getCoinById": getCoinById,
            "getCoinsBySupply": getCoinsBySupply
        };
        return api;

        function getBitcoin() {
            var url = "https://api.coinmarketcap.com/v1/ticker/bitcoin/";
            return $http.get(url);
        }

        /**
         * Get the coin with the specificed @coinId
         * 
         * @param {*} coinId 
         */
        function getCoinById(coinId) {
            for (var c in coins) {
                if(coins[c].id === coinId) {
                    return coins[c];
                }
            }
        }


        /**
         * Get all coins with a supply above @supply
         * 
         * @param {number} supply 
         */
        function getCoinsBySupply(supply) {
            var result = [];

            for (var c in coins) {
                if(coins[c].available_supply >= supply) {
                    result.push(coins[c]);
                }
            }

            return result; 
        }

    }
})();

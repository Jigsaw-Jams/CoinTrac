(function() {
    angular
        .module("CoinTrac")
        .factory("HoldingService", HoldingService);

    function HoldingService($http) {

        var api = {
            "createHolding" : createHolding,
            "findHoldingsForUser" : findHoldingsForUser,
            "deleteHolding" : deleteHolding
        };
        return api;

        function createHolding(userId, holding) {
            var url = "/api/v1/user/" + userId + "/holding"
            return $http.post(url, holding);
        }

        function findHoldingsForUser(userId) {
            var url = "/api/v1/user/" + userId + "/holding"
            return $http.get(url);
        }

        function deleteHolding(holdingId) {
            var url = "/api/v1/user/" + userId + "/holding"
            return $http.delete(url);
        }

    }
})();
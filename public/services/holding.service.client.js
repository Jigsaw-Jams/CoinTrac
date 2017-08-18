(function() {
    angular
        .module("CoinTrac")
        .factory("HoldingService", HoldingService);

    function HoldingService($http) {

        var api = {
            "createHolding" : createHolding,
            "findHoldingsForUser" : findHoldingsForUser,
            "updateHolding" : updateHolding,
            "deleteHolding" : deleteHolding
        };
        return api;

        function createHolding(userId, holding) {
            var url = "/api/v1/user/" + userId + "/holding";
            return $http.post(url, holding);
        }

        function findHoldingsForUser(userId) {
            var url = "/api/v1/user/" + userId + "/holding";
            return $http.get(url);
        }

        function updateHolding(holdingId, holding) {
            var url = "/api/v1/holding/" + holdingId;
            return $http.put(url, holding);
        }

        function deleteHolding(holdingId) {
            var url = "/api/v1/holding/" + holdingId;
            return $http.delete(url);
        }

    }
})();
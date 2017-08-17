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
            console.log('update dat sh');
            var url = "/api/v1/holding/" + holdingId;
            return $http.put(url, holding);
        }

        function deleteHolding(holdingId) {
            console.log('del that sh');
            var url = "/api/v1/holding/" + holdingId;
            return $http.delete(url);
        }

    }
})();
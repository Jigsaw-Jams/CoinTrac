(function() {
    angular
        .module("CoinTrac")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            "createUser"   : createUser,
            "findUserByCredentials" : findUserByCredentials,
            "findUserById" : findUserById
        };
        return api;

        function createUser(user) {
            var url = "/api/v1/user";
            console.log(url);
            return $http.post(url, user);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/v1/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = `/api/v1/user/${userId}`;
            return $http.get(url);
            
        }
    }
})();
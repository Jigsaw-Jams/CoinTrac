(function() {
    angular
        .module("CoinTrac")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            "createUser"   : createUser,
            "login" : login,
            "findUserByUsername" : findUserByUsername,
            "findUserById" : findUserById
        };
        return api;

        function createUser(user) {
            var url = "/api/v1/user";
            console.log(url);
            return $http.post(url, user);
        }

        function login(email, password) {
            var url = "/api/v1/login";
            return $http.post(url, {email: email, password: password});
        }

        // function findUserByCredentials(email, password) {
        //     var url = "/api/v1/user?email=" + email + "&password=" + password;
        //     return $http.get(url);
        // }

        function findUserByUsername(username) {
            var url =  "/api/v1/user?username=" + username;
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = `/api/v1/user/${userId}`;
            return $http.get(url);
        }
    }
})();
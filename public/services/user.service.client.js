(function() {
    angular
        .module("CoinTrac")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            "createUser"   : createUser,
            "login" : login,
            "logout": logout,
            "findUserByUsername" : findUserByUsername,
            "findUserById" : findUserById,
            "checkLogin" : checkLogin
        };
        return api;

        function createUser(user) {
            var url = "/api/v1/user";
            return $http.post(url, user);
        }

        function login(email, password) {
            var url = "/api/v1/login";
            return $http.post(url, {email: email, password: password});
        }

        function logout() {
            var url = "/api/v1/logout";
            return $http.post(url);
        }

        function findUserByUsername(username) {
            var url =  "/api/v1/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        //TODO UNRWAP RESPONSEES
        function findUserById(userId) {
            var url = `/api/v1/user/${userId}`;
            return $http.get(url);
        }

        
        function checkLogin() {
            var url = `/api/v1/checkLogin`;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
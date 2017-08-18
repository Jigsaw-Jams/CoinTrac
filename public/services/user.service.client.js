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
            "findUserByEmail" : findUserByEmail,
            "findAllUsers" : findAllUsers,
            "findUserById" : findUserById,
            "checkLogin" : checkLogin,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
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

        function findUserByEmail(email) {
            var url =  "/api/v1/user?email=" + email;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            var url =  "/api/v1/users";
            return $http.get(url)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }

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

        function updateUser(userId, user) {
            var url = `/api/v1/user/${userId}`;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function deleteUser(userId) {
            var url = `/api/v1/user/${userId}`;
            return $http.delete(url);
        }
    }
})();
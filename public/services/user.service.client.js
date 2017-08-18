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
            "deleteUser" : deleteUser,
            "addCoinToWatchlist": addCoinToWatchlist,
            "removeCoinFromWatchlist" : removeCoinFromWatchlist,
            "getFollowingLists": getFollowingLists
        };
        return api;

        function createUser(user) {
            var url = "/api/v1/user";
            return $http.post(url, user);
        }

        function login(email, password) {
            console.log('logging ing');
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

        function addCoinToWatchlist(userId, coinId) {
            var url = `/api/v1/user/${userId}/watchlist/${coinId}`;
            return $http.put(url);
        }

        function removeCoinFromWatchlist(userId, coinId) {
            var url = `/api/v1/user/${userId}/watchlist/${coinId}`;
            return $http.delete(url);
        }

        function getFollowingLists(userId) {
            var promises = [];
            var followingLists = [];

            findUserById(userId)
                .then(function (user) {
                    for (u in user.following) {
                        var following = user.following[u];
                        
                        (function (currentFollowing) {
                            promises.push(findUserById(currentFollowing)
                                .then(function (currUser) {
                                    followingLists.push(currUser.watchlist);
                                }))
                        })(following);

                    }

                    return Promise.all(promises)
                        .then(function (data) {
                            return folllowingLists;
                        });

                })
            
        }

    }
})();
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
            "getAllUsernames" : getAllUsernames,
            "findUserById" : findUserById,
            "checkLogin" : checkLogin,
            "updateUser" : updateUser,
            "followUser": followUser,
            "unfollowUser": unfollowUser,
            "isFollowing": isFollowing,
            "getUserlist": getUserlist,
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


        function followUser(userId, followedId) {
            var url = `/api/v1/user/${userId}/following/${followedId}`;
            return $http.put(url);
        }

        function unfollowUser(userId, unfollowedId) {
            var url = `/api/v1/user/${userId}/following/${unfollowedId}`;
            return $http.delete(url);
        }


        function getAllUsernames() {
            var usernames = [];

            return findAllUsers()
                .then(function (users) {
                    for (u in users) {
                        usernames.push(users[u].username);
                    }
                    return usernames;
                })
        }


        function getFollowingLists(userId) {
            var promises = [];
            var followingLists = [];
            
            return findUserById(userId)
                .then(function (userdata) {
                    var user = userdata.data;
                    for (u in user.following) {
                        var following = user.following[u];

                        (function (currentFollowing) {
                            promises.push(findUserById(currentFollowing)
                                .then(function (currUserData) {
                                    followingLists.push(currUserData.data.watchlist);
                                }));
                        })(following);

                    }

                    return Promise.all(promises)
                        .then(function (data) {
                            return followingLists;
                        });

                })
            
        }


        function getUserlist(user) {
            return getAllUsernames()
                .then(function (usernames) {
                    var promises = [];
                    var userList = [];

                    for (u in usernames) {
                        (function (currentUsername) {
                            promises.push(isFollowing(user, currentUsername)
                                .then(function (value) {
                                    var tmp  = {
                                        username: currentUsername,
                                        isFollowing : value
                                    }
                                    userList.push(tmp);
                                }));

                        })(usernames[u]);
                    }

                    return Promise.all(promises)
                        .then(function (data) { return userList; }
                    );
                });
        }


        // is user following user with username
        function isFollowing(user, username) {
            return findUserByUsername(username)
                .then(function (foundUser) {
                    return user.following.includes(foundUser._id);
                });
        }


    }
})();
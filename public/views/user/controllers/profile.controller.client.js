(function () {
    angular
        .module("CoinTrac")
        .controller("ProfileController", ProfileController);

        function ProfileController($routeParams, UserService, currentUser) {
            var model = this;
            model.currentUser = currentUser
            // model.loggedin = currentUser ? true : false;
            // model.userId = currentUser._id;
            
            var twitterHandle = "wolfofpoloniex"; /// TODO REMOVE 
            

            function init() {
                UserService
                    .findUserById(model.userId)
                    .then(function (user) {
                        model.user = user.data;
                    });

                twttr.ready(function () {
                    twttr.widgets.createTimeline(
                        {
                            sourceType: 'profile',
                            screenName: twitterHandle
                        },
                        document.getElementById('twitter-timeline'),
                        {});
                });
            }
            init();
            
        }

})();
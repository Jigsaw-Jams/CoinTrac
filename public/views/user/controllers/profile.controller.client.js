(function () {
    angular
        .module("CoinTrac")
        .controller("ProfileController", ProfileController);

        function ProfileController($routeParams, UserService) {
            var model = this;
            var twitterHandle = "wolfofpoloniex";
            model.userId = $routeParams["userId"];

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
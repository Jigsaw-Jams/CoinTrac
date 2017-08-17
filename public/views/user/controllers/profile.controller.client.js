(function () {
    angular
        .module("CoinTrac")
        .controller("ProfileController", ProfileController);

        function ProfileController($routeParams, UserService, currentUser) {
            var model = this;
            model.currentUser = currentUser;
            
            function init() {
                if (currentUser.twitterHandle) {
                    twttr.ready(function () {
                        twttr.widgets.createTimeline(
                            {
                                sourceType: 'profile',
                                screenName: model.user.twitterHandle
                            },
                            document.getElementById('twitter-timeline'),
                            {});
                    });
                }
            }
            init();
            
        }

})();
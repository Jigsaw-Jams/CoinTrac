(function() {
    angular
        .module("coinTracDirectives")
        .controller("PortfolioController", PortfolioController);

        function PortfolioController($scope, HoldingService, HomeService, DetailsService) {
            var portfolioModel = this;
            
            portfolioModel.createHolding = createHolding;


            function init() {
                portfolioModel.currentUser = $scope.currentuser;

                // Not sure how to get around DOM manipulation via jQuery here
                // This resets the modal when it is clicked out of.
                // I am currently just disabling the input field for validation
                $(document).ready(function () {
                    $('.modal').on('hidden.bs.modal', function(e) { 
                        // portfolioModel.holding = null;
                        portfolioModel.imgsrc = null;
                        $scope.$apply();
                    });
                });

                /** Find the current user's holdings then calc portfolio value **/
                findHoldingsForUser()
                    .then(function (d) {
                        calculatePortfolioValue();
                    })
                    


                /* Get all available coins for the search/autocomplete functionality */
                HomeService
                    .getSearchSource()
                    .then(function (searchSource) {
                        $("#coin-name").autocomplete({
                                source: searchSource,
                                select: function(event, ui) {
                                    this.value = ui.item.value;
                                    portfolioModel.imgsrc = ui.item.imgsrc;
                                    $scope.$apply();
                                },
                                create: function() {
                                    // credit: https://stackoverflow.com/questions/37045318/jquery-ui-custom-autocomplete-renderitem-and-rendermenu-not-working
                                    $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
                                        var labelAndIcon = `<a><img src="${item.imgsrc}"/> &nbsp ${item.label}</a>`
                                        return $("<li>")
                                            .append(labelAndIcon)
                                            .appendTo(ul);
                                     }
                            }
                        });
                    });
            }
            init();


            // Create a holding for the current user's portfolio
            function createHolding(holding) {
                holding.fiatCurrency = 'USD';
                var userId = portfolioModel.currentUser._id;
                holding._user = userId;

                HoldingService
                    .createHolding(userId, holding)
                    .then(function (holding) {
                        // empty inputs & update the portfolio to show this new holding
                        portfolioModel.newHolding = null;
                        portfolioModel.imgsrc = null;
                        findHoldingsForUser();
                        calculatePortfolioValue();
                    }, function (err) {
                        console.log(err);
                    });

            }





            /** UTILITY FUNCTIONS (not exposed on the view model) */
            function findHoldingsForUser() {
                // Only display holdings if there is a user currently logged in
                if (portfolioModel.currentUser != null) {
                    return HoldingService
                        .findHoldingsForUser(portfolioModel.currentUser._id)
                        .then(function (holdings) {
                            // return holdings.data;
                            if (holdings.data.length) {
                                portfolioModel.holdings = holdings.data;
                            }
                        });
                } else { //TODO BAD
                    console.log('no user');
                    return;
                }
            }


            function calculatePortfolioValue() {
                console.log('ready');
                var total = 0;
                var promises = [];

                for (h in portfolioModel.holdings) {
                    console.log('set');
                    promises.push(DetailsService
                        .getCoinDetails(portfolioModel.holdings[h].coinId)
                        .then(function (data) {
                            var amount = portfolioModel.holdings[h].amount;
                            var price = data.price_usd;
                            total = total + (amount * price);
                        })
                    );
                }
            
                return Promise.all(promises)
                    .then(function(data) {
                        portfolioModel.portfolioValue = total;
                    });

            }

        }
})();
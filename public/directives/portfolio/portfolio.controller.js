(function() {
    angular
        .module("coinTracDirectives")
        .controller("PortfolioController", PortfolioController);

        function PortfolioController($rootScope, $scope, HoldingService, CoinmarketcapService) {
            var portfolioModel = this;
            
            portfolioModel.createHolding = createHolding;
            portfolioModel.setCurrentHolding = setCurrentHolding;
            portfolioModel.updateHolding = updateHolding;
            portfolioModel.deleteHolding = deleteHolding;


            function init() {
                portfolioModel.currentUser = $rootScope.currentUser;

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

                getPortfolio();                    

                /* Get all available coins for the search/autocomplete functionality */
                CoinmarketcapService
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
                        getPortfolio();
                    }, function (err) {
                        console.log(err);
                    });

            }

            function setCurrentHolding(holding) {
                portfolioModel.currentHolding = holding;
            }

            function updateHolding(holdingId, holding) {
                HoldingService
                    .updateHolding(holdingId, holding)    
                    .then(function (holding) {
                        getPortfolio();
                        console.log(holding);
                    }, function (err) {
                        console.log(err);
                    });
            }

            function deleteHolding(holdingId) {
                HoldingService
                    .deleteHolding(holdingId)
                    .then(function (response) {
                        getPortfolio();
                        console.log('deleted');
                    }, function (err) {
                        console.log(err);
                    });
            }






            /** UTILITY FUNCTIONS (not exposed on the view model) */
            function findHoldingsForUser() {
                return HoldingService
                    .findHoldingsForUser(portfolioModel.currentUser._id)
                    .then(function (holdings) {
                        if (holdings.data.length) {
                            portfolioModel.holdings = holdings.data;
                            return holdings.data;
                        }
                    });
            }
            function calculateValueOfHoldings(holdings) {
                return CoinmarketcapService
                    .calculateValueOfHoldings(holdings)
                    .then(function (value) {
                        portfolioModel.value = value;
                        console.log(value);
                        return value;
                    });
            }
            /** Find the current user's holdings then calc portfolio value **/
            function getPortfolio() {
                if (portfolioModel.currentUser) {
                    findHoldingsForUser()
                        .then(function (holdings) {
                            calculateValueOfHoldings(holdings);
                        });
                }
            }

        }
})();
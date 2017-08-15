(function() {
    angular
        .module("coinTracDirectives")
        .controller("PortfolioController", PortfolioController);

        function PortfolioController($routeParams, $scope, HoldingService, HomeService) {
            var portfolioModel = this;
            portfolioModel.userId = $routeParams['userId'];
            portfolioModel.createHolding = createHolding;


            function init() {
                // Not sure how to get around DOM manipulation via jQuery here
                // This resets the modal when it is clicked out of.
                // I am currently just disabling the input field for validation
                $(document).ready(function () {
                    $('.modal').on('hidden.bs.modal', function(e) { 
                        portfolioModel.holding = null;
                        portfolioModel.imgsrc = null;
                        $scope.$apply();
                    });
                });
                ////////////////////////////////////////////////////////////////

                /** Find the current user's holdings  **/
                findHoldingsForUser();


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
            function createHolding() {
                portfolioModel.newHolding.fiatCurrency = 'USD';
                bad_id = "598e4e0217819930d2fbbfd9";
                portfolioModel.newHolding._user = bad_id;

                HoldingService
                    .createHolding(bad_id, portfolioModel.newHolding)
                    .then(function (response) {
                        // empty inputs & update the portfolio to show this new holding
                        portfolioModel.newHolding = null;
                        portfolioModel.imgsrc = null;
                        findHoldingsForUser();
                    }, function (err) {
                        console.log(err);
                    });

            }





            /** UTILITY FUNCTIONS (not exposed on the view model) */
            function findHoldingsForUser() {
                // Only display holdings if there is a user currently logged in
                if (portfolioModel.userId != null) {
                    HoldingService
                        .findHoldingsForUser(portfolioModel.userId)
                        .then(function (holdings) {
                            portfolioModel.holdings = holdings.data;
                            console.log('holdings loaded for user');
                        });
                } else { //TODO BAD
                    HoldingService
                        .findHoldingsForUser("598e4e0217819930d2fbbfd9")
                        .then(function (holdings) {
                            portfolioModel.holdings = holdings.data;
                            console.log('holdings loaded for user');
                            console.log(portfolioModel.holdings);
                        });                    
                }
            }


        }
})();
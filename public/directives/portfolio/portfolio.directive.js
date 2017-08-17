(function () {
    angular
        .module("coinTracDirectives")
        .directive("portfolio", portfolioDirective); //html doesn't have case sensitive tags  // CAMEL CASE THINGS ARE MAPPED to item-list


    function portfolioDirective() {
        function linkFunction(scope, element) { }

        return {
            templateUrl: "directives/portfolio/portfolio.view.html",
            // link: linkFunction
            controller: "PortfolioController",
            controllerAs: "portfolioModel",
            scope: {
                currentuser: "="
            }
        }
    }
})();
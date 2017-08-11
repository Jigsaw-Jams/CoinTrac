(function () {
    angular
        .module("coinTracDirectives", [])
        .directive("navbar", navbarDirective); //html doesn't have case sensitive tags  // CAMEL CASE THINGS ARE MAPPED to item-list


    function navbarDirective($http, $routeParams) {

        function linkFunction(scope, element) { }

        return {
            templateUrl: "directives/navbar.directive.client.html",
            link: linkFunction
        }
    }
})();
(function () {
    
    angular
        .module("coinTracDirectives")
        .directive("navbar", navbarDirective); //html doesn't have case sensitive tags  // CAMEL CASE THINGS ARE MAPPED to item-list
        
    function navbarDirective() {
        function linkFunction(scope, element) { }

        return {
            templateUrl: "directives/navbar/navbar.view.html",
            link: linkFunction
        }
    }
})();


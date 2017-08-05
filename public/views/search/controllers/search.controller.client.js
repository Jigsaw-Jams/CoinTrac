(function() {
    angular
        .module("CoinTrak")
        .controller("SearchController", SearchController);

        function SearchController(SearchService) {
            var model = this;
            model.searchForCoin = searchForCoin;

            function init() {
                // model.coinids = SearchService.getAllCoinIds();
                // console.log(model.coinids);
                SearchService.getAllCoinIds()
                    .then(function (coinIds) {
                        console.log(coinIds);
                        model.coinIds = coinIds;
                    })
            }
            init();


            // find coins with an ID like 'coinId' set model.searchResult as that new array
            function searchForCoin(coinId) {
                console.log('yoooooo');
                // https://stackoverflow.com/questions/5324798/how-to-search-an-array-in-jquery-like-sql-like-value-statement
                var coinIdUppercase = coinId.toUpperCase();
                var result = $.grep(model.coinIds, function(value) {
                    return value.toUpperCase().indexOf(coinIdUppercase) >= 0;
                });

                model.searchResult = result;
                return result;
            }

 
        }

})();
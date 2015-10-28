
// [] = no independency

/* <table> do not use it for lay out but for tabulet data

*/
angular.module('Movies', [])
    .controller('MoviesController', function($scope, $http) {
        // get() return a promise(object) like JSON
        $http.get('data/movies-2014.min.json')
            .then(function(results) {
                $scope.movies = results.data;
            });
    });
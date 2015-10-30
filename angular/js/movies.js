
// [] = no independency

/* <table> do not use it for lay out but for tabulet data

*/
angular.module('MoviesApp', ['ui.router'])

    .factory('moviesJSON', function($http) {
        return $http.get('data/movies-2014.min.json')
    })
    // use the state provider to add a number of states
    .config(function($stateProvider, $ulRouterProvider) {
            $stateProvider
                .state('list', {
                    url: '/movies',
                    templateUrl: 'views/movies-list.html',
                    controller: 'MoviesController'
                })
                .state('detail', {
                    url: '/movies/:index',
                    templateUrl: 'views/movies-datail.html',
                    controller: 'MovieDetailController'
                });
            $urlRouterProvider.otherwise('/movies')
    })
    .controller('MovieDetailController', function($scope, $stateParams,  moviesJSON) {
        moviesJSON.then(function(result){
            $scope.movie = results.data[$stateParams.index]
        })
    })



    .controller('MoviesController', function($scope, $http, moviesJSON) {
        // rating: value
        var ratingsMap = {
            'Not Rated': 0,
            'G': 1,
            'PG': 2,
            'PG-13': 3,
            'R': 4,
            'NC-17': 5,
            'X': 6
        };

        // get() return a promise(object) like JSON
            moviesJSON.then(function(results) {
                // assign result to scope of movies
                $scope.movies = results.data.map(function(movie) {
                   movie.ratingOrdinal = ratingsMap[movie.rating];
                    return movie;
                });
                // unique set of distributor
                $scope.distributors = _.uniq(_.pluck($scope.movies, 'distributor'));
            });
        $scope.setSort = function(propertyName) {
            if($scope.sortCol === propertyName) {
                $scope.sortReverse = !$scope.sortReverse;
            } else {
                $scope.sortCol = propertyName;
                $scope.sortReverse = false;
            }
        }
    });

/* 1. establish different sorting orders:
        ==> orderBy: sorCol property + ng-click
   2. Sort reverse & when to change it to reverse and when not
        ==> sorCol: sortReverse
        ==> if($scope.sort === propertyName) {
            }
   3. Map function: Construct a new array and return a new array that is the same size with original array
   4. unique set of values
   5. Selector
      a. </p>
            <select>
                <option value="1"> Value 1</option>
                <option value="2"> Value 2</option>
            </select>
         <p>
            <span ng-repeat="d in distributors">{{d}}</span>
         </p>
      b. unique value + <selector ng-model ng-option>
            + filter: {distributor: currentDistributor} (refer to the currenDistributor we created in ng-model)

   6. Angular UI Router
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('MovieFactory', MovieFactory);

    MovieFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function MovieFactory($http, $q) {
        var service = {
            getMovie: getMovie,
            getMovieDetail,
            getMovieDetail
        };
        return service;

        ////////////////

        //movie search by keywords
        function getMovie(movieSearch) {

            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'http://www.omdbapi.com/',
                params: {
                    s: movieSearch,
                    plot: 'short',
                    type: 'movie',
                }
            }).then(function(response) {
                    if (response.status === 200 && response.data.Response === 'True') {
                        defer.resolve(response);
                    } else {
                        defer.reject("No Movie Search Results!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;
        }

        //function for movie descriptions title searh

        function getMovieDetail(movieTitle, movieYear) {

            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'http://www.omdbapi.com/',
                params: {
                    t: movieTitle,
                    y: movieYear,
                    plot: 'full',
                    tomatoes: 'True',
                    type: 'movie',
                }
            }).then(function(response) {
                    if (response.status === 200 && response.data.Response === 'True') {
                        defer.resolve(response);
                    } else {
                        defer.reject("No Movie Search Results!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;

        }
    }
})();



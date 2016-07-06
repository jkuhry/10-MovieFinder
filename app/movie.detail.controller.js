(function() {
    'use strict';

    angular
        .module('app')
        .controller('MovieDetailController', MovieDetailController);

    MovieDetailController.$inject = ['MovieFactory', '$state', '$stateParams', 'toastr'];

    /* @ngInject */
    function MovieDetailController(MovieFactory, $state, $stateParams, toastr) {
        var vm = this;
        vm.title = 'MovieDetailController';

        // $state parameters
        vm.loading = true;
        var movieTitle = $stateParams.movieTitle;
        var movieYear = $stateParams.movieYear;

        vm.state = $state.current
        vm.params = $stateParams;

        vm.getMovieDetail = getMovieDetail;

        activate();

        ////////////////

        //Movie details 
        function activate() {
            MovieFactory.getMovieDetail(movieTitle, movieYear)
                .then(function(response) {

                        vm.movieDetail = response.data;
                        vm.loading = false;
                        toastr.success('Movie Details Loaded!');

                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                            vm.loading = false;
                        } else {
                            toastr.error(error);
                            vm.loading = false;
                        }
                    })
        }

        //Title of movie function
        function getMovieDetail(movieTitle, movieYear) {
            MovieFactory.getMovieDetail(movieTitle, movieYear)
                .then(function(response) {

                        vm.movieDetail = response.data;

                        toastr.success('Movie Details Loaded!');

                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.error(error);
                        }
                    })

        }
    }
})();


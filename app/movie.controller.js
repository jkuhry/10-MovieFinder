(function() {
    'use strict';

    angular
        .module('app')
        .controller('MovieController', MovieController);

    MovieController.$inject = ['MovieFactory', '$state', '$stateParams', 'toastr'];

    /* @ngInject */
    function MovieController(MovieFactory, $state, $stateParams, toastr) {
        var vm = this;
        vm.title = 'MovieController';

        //
        vm.loading = true;
        var movieSearch = $stateParams.movieSearch;

        vm.state = $state.current;
        vm.params = $stateParams;

        vm.getMovie = getMovie;
        vm.onFormSubmit = onFormSubmit;

        activate();

        ////////////////

        //

        function activate() {
            if (typeof movieSearch === 'string') {
                vm.getMovie(movieSearch);
            }
        }


        function getMovie(movieSearch) {
            MovieFactory.getMovie(movieSearch)
                .then(function(response) {

                        vm.movieSearchResult = response.data;
                        vm.loading = false;

                        toastr.success('Movie Data Loaded!');

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

        function onFormSubmit(movieSearch) {
            $state.go('search', { 'movieSearch': movieSearch });
        }


    }


})();
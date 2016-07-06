(function() {
    'use strict';

    var app = angular.module('app', ['ui.router', 'toastr']);

    app.config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/home');
      
      $stateProvider
         
             
          .state('search', {
              url: '/search/:movieSearch',
              templateUrl: 'app/partials/state-search.html',
              controller: 'MovieController',
              controllerAs: 'vm'
          })

          .state('detail', {
              url: '/detail/:movieTitle?:movieYear',
              templateUrl: 'app/partials/state-detail.html',
              controller: 'MovieDetailController',
              controllerAs: 'vm'
          })
          
  });

})();
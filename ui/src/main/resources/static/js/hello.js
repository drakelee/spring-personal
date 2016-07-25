angular.module('hello', [ 'ngRoute', 'home', 'summary', 'portfolio', 'current', 'navigation' ]).config(
    
    function($locationProvider, $routeProvider, $httpProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider.when('/', {
            templateUrl : 'js/home/home.html',
            controller : 'home',
            controllerAs: 'controller'
        }).when('/summary', {
            templateUrl : 'js/summary/summary.html',
            controller : 'summary',
            controllerAs: 'controller'
        }).when('/portfolio', {
            templateUrl : 'js/portfolio/portfolio.html',
            controller : 'portfolio',
            controllerAs : 'controller'
        }).when('/current', {
            templateUrl : 'js/current/current.html',
            controller : 'current',
            controllerAs : 'controller'
        }).when('/login', {
            controller : 'navigation',
            controllerAs : 'controller'
        }).otherwise('/');

        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
});

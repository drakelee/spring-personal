angular.module('hello', [ 'ngRoute', 'angularCSS', 'home', 'summary', 'portfolio', 'current', 'navigation', 'ign', 'intro' ]).config(
    
    function($locationProvider, $routeProvider, $httpProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider.when('/', {
            templateUrl : 'js/home/home.html',
            controller : 'home',
            controllerAs: 'controller',
            css: 'css/angular-bootstrap.css'
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
        }).when('/ign-intro', {
            templateUrl : 'js/ign/intro/intro.html',
            controller : 'intro',
            controllerAs : 'controller',
            css: 'css/ign-css.css'
        }).when('/ign', {
            templateUrl : 'js/ign/ign.html',
            controller : 'ign',
            controllerAs : 'controller',
            css: 'css/ign-css.css'
        }).when('/login', {
            controller : 'navigation',
            controllerAs : 'controller'
        }).otherwise('/');

        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
});

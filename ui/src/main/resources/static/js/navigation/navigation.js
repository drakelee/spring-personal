angular.module('navigation', ['ngRoute']).controller('navigation', function($route) {
    var self = this;

    self.tab = function(route) {
        return $route.current && route === $route.current.controller;
    };
});

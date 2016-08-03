angular.module('ign', []).controller('ign', function($scope, $window) {
    var self = this;
    
    $scope.go = function(path) {
        $window.location.href = "http://52.24.247.1:8080" + path;
    };

    var prep = function(title, item) {
        $('h1').remove();
        $('.project-li').addClass("min");
        $('.project-item-name').addClass("min");
        $('.header').addClass(item);
        $('.index.container').addClass("ign");
        $('.header').load("http://52.24.247.1:8080/ui/js/ign/"+item+"/"+item+".html", function() {
            $('.header').prepend('<div class="container-item '+item+'"></div>');
            $('.container-item').append('<div class="container-title">'+title+'</div>');
            $('.header').append('<div class="project-container container center"></div>');
            $('.project-container').load("http://52.24.247.1:8080/ui/js/ign/project-carousel/project-carousel.html");
        });
    }

    var refresh = function() {
        
    };

    $scope.loadIntro = function() {
        prep("Code Foo 2015", "intro");
        console.log("CLICK");
    };
    
    $scope.loadBlogs = function () {
        prep("Mobile Blogs", "blogs");
    };

    $('.index.container').addClass('ign');
});

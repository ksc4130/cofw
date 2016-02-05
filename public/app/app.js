var myApp = angular.module("myApp", [
    'ui.router',
    'ui.bootstrap',
    'cofw.core'
]);

myApp.run(function($rootScope){
    $rootScope.$on('$stateChangeSuccess',function(){
        $("html, body").animate({ scrollTop: 0 }, 300);
    })
});

myApp.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});

myApp.controller('appCtrl', appCtrl);
appCtrl.$inject = ['$scope', '$state', '$http', '$sce'];
function appCtrl($scope, $state, $http, $sce){
    $scope.today = new Date();
    $scope.state = $state;
    $scope.posts = $http.get('/app/data/posts.json').then(function(resp){
        $scope.posts = resp.data.posts;
    });

    $scope.safeHTML = function(x){
        return $sce.trustAsHtml(x);
    };
    for(var i = 0; i < $scope.posts.length; i++){
        $scope.posts[i].createdOn = new Date($scope.posts[i].date);
    }

}

myApp.config(config);
config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        url: "/",
        templateUrl: "/app/views/_homePage.html",
        controller: 'homeCtrl'
    }).state('post', {
        url: "/post/:id",
        templateUrl: "/app/views/_post.html",
        controller: 'postCtrl'
    }).state('about', {
        url: "/about",
        templateUrl: "/app/views/_aboutPage.html",
        controller: 'aboutCtrl'
    }).state('contact', {
        url: "/contact",
        templateUrl: "/app/views/_contactPage.html",
        controller: 'contactCtrl'
    }).state('contest', {
        url: "/contest",
        templateUrl: "/app/views/_contestPage.html",
        controller: 'contestCtrl'
    }).state('meetings', {
        url: "/meetings",
        templateUrl: "/app/views/_meetingsPage.html",
        controller: 'meetingsCtrl'
    }).state('members', {
        url: "/members",
        templateUrl: "/app/views/_memberPage.html",
        controller: 'membersCtrl'
    }).state('member', {
        url: "/members/member/:id",
        templateUrl: "/app/views/_member.html",
        controller: 'memberCtrl'
    });
    $locationProvider.html5Mode(true);
}

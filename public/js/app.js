'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'ui.bootstrap',
  'ngRoute',
  'ngAnimate',
  'ngSanitize',
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(['$routeProvider','$locationProvider',function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/sc100', {
      templateUrl: 'partials/other/sc100'
    }).
    when('/sc100full', {
      templateUrl: 'partials/other/sc100full',
      controller: 'ScBasicCtrl'
    }).
    when('/scbasic', {
      templateUrl: 'partials/scbasic',
      controller: 'ScBasicCtrl'
    }).
    when('/file', {
      templateUrl: 'partials/sc100-jade',
    }).
    otherwise({
      redirectTo: '/file'
    });
    
  $locationProvider.html5Mode(true);
}])


// removed module dependencies
/*
'ui.router',
*/

// Other two states for bootstrap quiz and form
/*
.state('sc100',{
    url: '/sc100',
    template: 'partials/other/sc100'
  })
  .state({
    name:'sc100full',
    url: '/sc100full',
    template: 'partials/other/sc100full',
    controller: 'ScBasicCtrl'
  })
*/

// ngRoute config
/*
config(['$routeProvider','$locationProvider', '$mdThemingProvider',function ($routeProvider, $locationProvider, $mdThemingProvider) {
  $routeProvider.
    when('/sc100', {
      templateUrl: 'partials/other/sc100'
    }).
    when('/sc100full', {
      templateUrl: 'partials/other/sc100full',
      controller: 'ScBasicCtrl'
    }).
    when('/scbasic', {
      templateUrl: 'partials/scbasic',
      controller: 'ScBasicCtrl'
    }).
    when('/file', {
      templateUrl: 'partials/filesc',
      controller: 'ScBasicCtrl'
    }).
    otherwise({
      redirectTo: '/scbasic'
    });

  $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('yellow')
    .dark();

  $locationProvider.html5Mode(true);
}])
*/

// ui-router config
/*
config(['$stateProvider', '$urlRouterProvider','$mdThemingProvider',function($stateProvider, $urlRouterProvider, $mdThemingProvider){
  $stateProvider
  .state('scbasic', {
    url: '/scbasic',
    template: 'partials/scbasic',
    controller: 'ScBasicCtrl'
  })
  .state('file', {
    url: '/file',
    template: 'partials/filesc',
    controller: 'ScBasicCtrl'
  });
  $urlRouterProvider.otherwise('/scbasic');
  $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('yellow')
    .dark();

  }]);

*/

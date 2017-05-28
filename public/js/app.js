'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'ui.bootstrap',
  'ngRoute',
  'ngAnimate', 
  'ngSanitize',
  'ngMaterial',
  'ngMessages', 
  'material.svgAssetsCache',
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(['$routeProvider','$locationProvider', '$mdThemingProvider',function ($routeProvider, $locationProvider, $mdThemingProvider) {
  $routeProvider.
    when('/sc100', {
      templateUrl: 'partials/sc100',
    }).
    when('/sc100full', {
      templateUrl: 'partials/sc100full',
      controller: 'ScCtrl'
    }).
    when('/scbasic', {
      templateUrl: 'partials/scbasic',
      controller: 'ScBasicCtrl'
    }).
    when('/file', {
        templateUrl: 'partials/filesc',
        controller: 'FileScCtrl'
    }).
    otherwise({
      redirectTo: '/sc100full'
    });
  
  /******************************************************
                      Angular Material Theme
  *********************************************************/
  $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('yellow')
    .dark();
  
  $locationProvider.html5Mode(true);
}]);

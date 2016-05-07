'use strict';

angular.module('redditoApp.auth', [
  'redditoApp.constants',
  'redditoApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

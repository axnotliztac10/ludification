'use strict';

angular.module('ludificationApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngMessages',
  'ui.router',
  'ngMaterial'
]).constant("AppConfig", {
        socket: 'http://localhost:7000/'
    })
  .config(function($mdIconProvider) {
    $mdIconProvider
      .iconSet('action', '../assets/iconsets/action-icons.svg', 24)
      .iconSet('alert', '../assets/iconsets/alert-icons.svg', 24)
      .iconSet('av', '../assets/iconsets/av-icons.svg', 24)
      .iconSet('communication', '../assets/iconsets/communication-icons.svg', 24)
      .iconSet('content', '../assets/iconsets/content-icons.svg', 24)
      .iconSet('device', '../assets/iconsets/device-icons.svg', 24)
      .iconSet('editor', '../assets/iconsets/editor-icons.svg', 24)
      .iconSet('file', '../assets/iconsets/file-icons.svg', 24)
      .iconSet('hardware', '../assets/iconsets/hardware-icons.svg', 24)
      .iconSet('icons', '../assets/iconsets/icons-icons.svg', 24)
      .iconSet('image', '../assets/iconsets/image-icons.svg', 24)
      .iconSet('maps', '../assets/iconsets/maps-icons.svg', 24)
      .iconSet('navigation', '../assets/iconsets/navigation-icons.svg', 24)
      .iconSet('notification', '../assets/iconsets/notification-icons.svg', 24)
      .iconSet('social', '../assets/iconsets/social-icons.svg', 24)
      .iconSet('toggle', '../assets/iconsets/toggle-icons.svg', 24)
      .iconSet('avatar', '../assets/iconsets/avatar-icons.svg', 128);
  })
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(false);
  }).config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoadingListener');
}])
.factory('LoadingListener', [ '$q', '$rootScope', function($q, $rootScope) {
    var reqsActive = 0;

    function onResponse() {
        reqsActive--;
        if (reqsActive === 0) {
            $rootScope.$broadcast('loading:completed');
        }
    }

    return {
        'request': function(config) {
            if (reqsActive === 0) {
                $rootScope.$broadcast('loading:started');
            }
            reqsActive++;
            return config;
        },
        'response': function(response) {
            if (!response || !response.config) {
                return response;
            }
            onResponse();
            return response;
        },
        'responseError': function(rejection) {
            if (!rejection || !rejection.config) {
                return $q.reject(rejection);
            }
            onResponse();
            return $q.reject(rejection);
        },
        isLoadingActive : function() {
            return reqsActive === 0;
        }
    };
}])

.directive('loadingListener', [ '$rootScope', 'LoadingListener', '$timeout', function($rootScope, LoadingListener, $timeout) {
    var button = '<md-progress-circular style="transform: translate(-50%, -50%);" md-mode="indeterminate" md-diameter="96" aria-valuemin="0" aria-valuemax="100" role="progressbar" class="ng-scope" style="width: 96px; height: 96px;"><div class="md-scale-wrapper md-mode-indeterminate" style="transform: translate(-50%, -50%) scale(0.96);"><div class="md-spinner-wrapper"><div class="md-inner"><div class="md-gap"></div><div class="md-left"><div class="md-half-circle"></div></div><div class="md-right"><div class="md-half-circle"></div></div></div></div></div></md-progress-circular>'
    var circle = '<div style="transform: translate(50%, 350px);">'+button+'</div>'
    var tpl = '<div class="loading-indicator" style="background-color: #0f121c;position: fixed; height: 100%; width: 100%; z-index: 1000">'+circle+'</div>';

    return {
        restrict: 'CA',
        link: function linkFn(scope, elem, attr) {
            var indicator = angular.element(tpl);
            elem.prepend(indicator);

            if (!LoadingListener.isLoadingActive()) {
                indicator.css('display', 'none');
            }

            $rootScope.$on('loading:started', function () {
                indicator.css('display', 'block');
            });
            $rootScope.$on('loading:completed', function () {
                $timeout(function () {
                  indicator.addClass('getOut');
                }, 1500);
            });
        }
    };
}])

.directive('imgMeta', function () {
  return {
    scope: {
        imgMeta: '=imgMeta'
    },
    restrict: 'AE',
    link: function (scope, elem, attr) {
      console.log(scope.imgMeta)
      angular.element(elem).attr("src", scope.imgMeta);
    }
  }
});

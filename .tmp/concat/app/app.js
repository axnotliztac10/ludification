'use strict';

angular.module('ludificationApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngMessages',
  'ui.router',
  'ngMaterial'
])
  .config(["$mdIconProvider", function($mdIconProvider) {
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
  }])
  .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(false);
  }]);

'use strict';

angular.module('ludificationApp')
  .controller('MainCtrl', ["$scope", "$http", function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.getColor = function($index) {
      var _d = ($index + 1) % 11;
      var bg = '';

      switch(_d) {
        case 1:       bg = 'red';         break;
        case 2:       bg = 'green';       break;
        case 3:       bg = 'darkBlue';    break;
        case 4:       bg = 'blue';        break;
        case 5:       bg = 'yellow';      break;
        case 6:       bg = 'pink';        break;
        case 7:       bg = 'darkBlue';    break;
        case 8:       bg = 'purple';      break;
        case 9:       bg = 'deepBlue';    break;
        case 10:      bg = 'lightPurple'; break;
        default:      bg = 'yellow';      break;
      }

      return bg;
    };

    $scope.getSpan = function($index) {
      var _d = ($index + 1) % 11;

      if (_d === 1 || _d === 5) {
        return 2;
      }
    };

  }]);

'use strict';

angular.module('ludificationApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/deprecated',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  }]);
'use strict';

angular.module('ludificationApp')
  .controller('MainLudCtrl', ["$scope", "$timeout", "SocketIO", function ($scope, $timeout, SocketIO) {
    $scope.message = 'Hello';

    $scope.persons = [
	    { name: 'Sergio Perez', ontime: true, count: 3 },
	    { name: 'Sausage', ontime: false, count: 2 },
	    { name: 'Black Olives', ontime: true, count: 19 },
	    { name: 'Green Peppers', ontime: false, count: 10 }
	 ];

	 $scope.$on('newPerson', function () {
	 	$scope.newPerson();
	 })

	$scope.newPerson = function () {
		$scope.animateList = true;
		$timeout(function () {
			$scope.animateList = false;
			$scope.persons.unshift({ name: 'Josh Peppers', ontime: false, count: 5 });
		}, 500);
	};

  }]);

angular.module('ludificationApp')
  .service('SocketIO', ["$rootScope", function ($rootScope) {
  		var socket = io('http://localhost:7000');
	   	socket.on('newArrival', function (data) {
	    	$rootScope.$broadcast('newPerson', data);
	    });

	    return socket;
  }]);

  
'use strict';

angular.module('ludificationApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('main_lud', {
        url: '/',
        templateUrl: 'app/main_lud/main_lud.html',
        controller: 'MainLudCtrl'
      });
  }]);
'use strict';

angular.module('ludificationApp')
  .filter('ontimeLabel', function () {
    return function (input) {
      return input ? 'llego a horario' : 'llego tarde';
    };
  });

'use strict';

angular.module('ludificationApp')
  .controller('DialogController', ["$scope", "$mdDialog", function ($scope, $mdDialog) {
  $scope.closeDialog = function() {
    $mdDialog.hide();
  };

  
}]);

'use strict';

angular.module('ludificationApp')
  .controller('ShellCtrl', ["$mdSidenav", "$mdDialog", "$scope", "$location", function ($mdSidenav, $mdDialog, $scope, $location) {

    

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.toggleLeft = function() {
      $mdSidenav('left').toggle();
    };

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.notificationsEnabled = true;
    $scope.toggleNotifications = function() {
      $scope.notificationsEnabled = !$scope.notificationsEnabled;
    };

    $scope.redial = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Suddenly, a redial')
          .content('You just called a friend; who told you the most amazing story. Have a cookie!')
          .ok('That was easy')
        );
      originatorEv = null;
    };

    $scope.checkVoicemail = function() {
      // This never happens.
    };

    $scope.showAddDialog = function($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        templateUrl: 'components/shell/dialog/dialog.html',
        controller: 'DialogController'
      });
    };
  }]);

angular.module('ludificationApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/main/main.html',
    "<div ng-include=\"'components/shell/shell.html'\"></div><md-grid-list class=things-list md-cols-sm=1 md-cols-md=2 md-cols-gt-md=5 md-row-height-gt-md=1:1 md-row-height=4:3 md-gutter=8px md-gutter-gt-sm=4px><md-grid-tile ng-repeat=\"thing in awesomeThings\" ng-class=getColor($index) md-rowspan={{getSpan($index)}} md-colspan={{getSpan($index)}} md-colspan-sm=1><md-icon class=avatar-icon md-svg-icon=\"avatar:svg-{{ ($index + 1) % 11 }}\"></md-icon><md-grid-tile-footer><h3>{{thing.name}}</h3></md-grid-tile-footer></md-grid-tile></md-grid-list>"
  );


  $templateCache.put('app/main_lud/main_lud.html',
    "<md-toolbar md-scroll-shrink ng-if=true><div class=md-toolbar-tools><h3><span>Inicio</span></h3><md-button ng-click=newPerson() class=\"md-primary md-fab\"></md-button></div></md-toolbar><md-content flex><md-list ng-cloak ng-class=\"{'animate': animateList}\"><!--md-subheader class=\"md-no-sticky\">Inicio</md-subheader>--><md-list-item ng-repeat=\"person in persons\" ng-class=\"{'first-element': $first}\"><img src=assets/images/user1.png class=\"md-avatar\"><p>{{ person.name }} <span>{{persons.ontime | ontimeLabel}}</span><br><md-chips><md-chip>Digital</md-chip><md-chip>Chilpancingo</md-chip><md-chip class=timer-logo></md-chip><md-chip>{{ person.count }}</md-chip></md-chips></p><md-button class=\"md-primary md-fab\">9:50</md-button></md-list-item></md-list></md-content>"
  );


  $templateCache.put('components/shell/dialog/dialog.html',
    "<md-dialog aria-label=\"List dialog\"><md-dialog-content><h2 class=md-title>Set a description for the new thing</h2><form name=projectForm><md-input-container><label>Description</label><input md-maxlength=30 required name=description ng-model=newThing><div ng-messages=projectForm.description.$error><div ng-message=required>This is required.</div><div ng-message=md-maxlength>The name has to be less than 30 characters long.</div></div></md-input-container></form></md-dialog-content><div class=md-actions><md-button ng-click=closeDialog() class=md-primary>Cancel</md-button><md-button ng-click=addThing() class=md-primary>Save</md-button></div></md-dialog>"
  );


  $templateCache.put('components/shell/shell.html',
    "<div ng-controller=ShellCtrl class=main-shell><md-sidenav class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=left><md-toolbar class=\"md-tall md-accent\"></md-toolbar><md-content layout-padding></md-content></md-sidenav><md-toolbar><div class=md-toolbar-tools><md-button ng-click=toggleLeft() class=md-icon-button aria-label=Settings><md-icon md-svg-icon=assets/icons/menu.svg></md-icon></md-button><h2><span>ludification</span></h2><span flex=\"\"></span><md-menu><md-button aria-label=\"Open phone interactions menu\" class=md-icon-button ng-click=\"openMenu($mdOpenMenu, $event)\"><md-icon md-menu-origin md-svg-icon=assets/icons/dots-vertical.svg></md-icon></md-button><md-menu-content width=4><md-menu-item><md-button ng-click=showAddDialog($event)><md-icon md-svg-icon=content:add md-menu-align-target></md-icon>Add</md-button></md-menu-item><md-menu-item><md-button ng-click=redial($event)><md-icon md-svg-icon=communication:dialpad md-menu-align-target></md-icon>Redial</md-button></md-menu-item><md-menu-item><md-button disabled ng-click=checkVoicemail()><md-icon md-svg-icon=communication:voicemail></md-icon>Check voicemail</md-button></md-menu-item><md-menu-item><md-button ng-click=toggleNotifications()><md-icon md-svg-icon=\"social:notifications{{notificationsEnabled ? '_off' : ''}}\"></md-icon>{{notificationsEnabled ? 'Disable' : 'Enable' }} notifications</md-button></md-menu-item></md-menu-content></md-menu></div></md-toolbar></div>"
  );

}]);


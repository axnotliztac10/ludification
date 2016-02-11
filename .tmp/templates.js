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

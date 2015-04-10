///<reference path='references.ts'/>
'use strict';
var app;
(function (app) {
    var ganttapp = angular.module('ganttApp', ['ngRoute', 'ngMaterial', 'LocalStorageModule']).service('projectService', app.ProjectService).controller('LayoutController', ['$mdBottomSheet', '$q', '$mdSidenav', app.LayoutController]).controller('SidenavController', ['$location', 'projectService', app.SidenavController]).config(function ($routeProvider, $mdThemingProvider, $mdIconProvider) {
        $routeProvider.when('/gantt', {
            templateUrl: 'gantt/gantt.html',
            controller: app.GanttCtrl,
            controllerAs: "gantt"
        }).otherwise({
            templateUrl: 'welcome/welcome.html'
        });
        $mdIconProvider.icon("menu", "css/icons/menu.svg");
        $mdThemingProvider.theme("default").primaryPalette("teal").accentPalette("blue-grey");
    });
})(app || (app = {}));
//# sourceMappingURL=app.js.map
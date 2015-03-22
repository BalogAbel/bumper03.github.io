///<reference path='references.ts'/>
'use strict';
var app;
(function (app) {
    var ganttapp = angular.module('ganttApp', ['ngRoute', 'ui.bootstrap', 'LocalStorageModule']).service('projectService', app.ProjectService).config(function ($routeProvider) {
        $routeProvider.when('/gantt', {
            templateUrl: 'gantt/gantt.html',
            controller: app.GanttCtrl,
            controllerAs: "gantt"
        }).otherwise({
            templateUrl: 'menu/menu.html',
            controller: app.MenuCtrl,
            controllerAs: "menu"
        });
    });
})(app || (app = {}));
//# sourceMappingURL=app.js.map
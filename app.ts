///<reference path='references.ts'/>
'use strict';
module app {
    var ganttapp:ng.IModule = angular.module('ganttApp', ['ngRoute', 'ui.bootstrap', 'LocalStorageModule'])
        .service('projectService', app.ProjectService)
        .config(($routeProvider:ng.route.IRouteProvider) => {
            $routeProvider
                .when('/gantt', {
                    templateUrl: 'gantt/gantt.html',
                    controller: app.GanttCtrl,
                    controllerAs: "gantt"
                })
                .otherwise({
                    templateUrl: 'menu/menu.html',
                    controller: app.MenuCtrl,
                    controllerAs: "menu"

                });

        });
}



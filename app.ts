///<reference path='references.ts'/>
'use strict';
module app {
    var ganttapp: ng.IModule = angular.module('ganttApp', ['ngRoute', 'ui.bootstrap', 'LocalStorageModule']);
    ganttapp.config(($routeProvider:ng.route.IRouteProvider) => {
        $routeProvider
            .when('/gantt', {
                templateUrl: 'app/gantt/gantt.html',
                controller: app.GanttCtrl,
                controllerAs: "gantt"
            })
            .otherwise({
                templateUrl: 'app/menu/menu.html',
                controller: app.MenuCtrl,
                controllerAs: "menu"

            });

    });
}



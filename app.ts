///<reference path='references.ts'/>
'use strict';
module app {
    import ng = angular;

    var ganttapp:ng.IModule = angular.module('ganttApp', ['ngRoute', 'ngMaterial', 'LocalStorageModule'])

        .service('projectService', app.ProjectService)
        .controller('LayoutController', ['$mdBottomSheet', '$q', '$mdSidenav', LayoutController])
        .controller('SidenavController', ['$location', 'projectService', SidenavController])

        .config(($routeProvider:ng.route.IRouteProvider, $mdThemingProvider:ng.material.MDThemingProvider, $mdIconProvider:ng.material.MDIconProvider) => {
            $routeProvider
                .when('/gantt', {
                    templateUrl: 'gantt/gantt.html',
                    controller: app.GanttCtrl,
                    controllerAs: "gantt"
                })
                .otherwise({
                    templateUrl: 'welcome/welcome.html'
                });

            $mdIconProvider
                .icon("menu", "css/icons/menu.svg");

            $mdThemingProvider
                .theme("default")
                .primaryPalette("teal")
                .accentPalette("blue-grey");
        });

}




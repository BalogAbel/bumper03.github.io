///<reference path='references.ts'/>
'use strict';
module app {
    import ng = angular;

    var ganttapp:ng.IModule = ng.module('ganttApp', ['ngRoute', 'ngMaterial', 'LocalStorageModule'])

        .directive('resizable', function () {
            return {
                restrict: 'A',
                scope: {
                    callback: '&onResize'
                },
                link: function postLink(scope: any, elem, attrs) {
                    elem.resizable({
                        handles: 'e, w'
                    });
                    elem.on('resizestop', function (evt, ui) {
                        if (scope.callback) {
                            scope.callback();
                        }
                    });
                }
            };
        })


        .service('projectService', app.ProjectService)

        .controller('LayoutController', ['$mdBottomSheet', '$q', '$mdSidenav', LayoutController])
        .controller('SidenavController', ['$location', 'projectService', SidenavController])

        .config(($routeProvider:ng.route.IRouteProvider, $mdThemingProvider:ng.material.IThemingProvider, $mdIconProvider:ng.material.IIconProvider) => {
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




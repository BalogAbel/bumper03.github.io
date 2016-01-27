import {LayoutController} from './components/LayoutController'
import {ProjectService} from './components/ProjectService'
import {SidenavController} from './components/SidenavController'
import {GanttCtrl} from "./gantt/GanttController";
import {GDriveService} from "./components/GDriveService";


var ganttApp = angular.module('ganttApp', ['ngRoute', 'ngMaterial', 'angular-google-gapi', 'angular-filepicker'])

    .directive('resizable', function () {
        return {
            restrict: 'A',
            scope: {
                callback: '&onResize'
            },
            link: function postLink(scope:any, elem:any, attrs:any) {
                elem.resizable({
                    handles: 'e, w'
                });
                elem.on('resizestop', function (evt:any, ui:any) {
                    if (scope.callback) {
                        scope.callback();
                    }
                });
            }
        };
    })

    .config(function (filepickerProvider: any) {
        filepickerProvider.setKey('AlMMWkdhRP6iRArvFb0qbz');
    })

    .service('GDriveService', ['GAuth', 'GApi', 'GData', '$q', '$window', '$http', GDriveService])
    .service('ProjectService', ['GDriveService', '$mdDialog', '$window', ProjectService])

    .controller('LayoutController', ['$mdBottomSheet', '$q', '$mdSidenav', LayoutController])
    .controller('SidenavController', ['$location', 'ProjectService', SidenavController])


    .config(($routeProvider:ng.route.IRouteProvider, $mdThemingProvider:ng.material.IThemingProvider, $mdIconProvider:ng.material.IIconProvider) => {
        $routeProvider
            .when('/gantt', {
                templateUrl: 'gantt/gantt.html',
                controller: GanttCtrl,
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
angular.element(document).ready(function () {
    angular.bootstrap(document, ['ganttApp']);
});




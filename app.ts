import {LayoutController} from './components/LayoutController'
import {ProjectService} from './components/ProjectService'
import {SidenavController} from './components/SidenavController'
import {GanttCtrl} from "./gantt/GanttController";
import {GDriveService} from "./components/GDriveService";
import {WelcomeController} from "./welcome/WelcomeController";


var ganttApp = angular.module('ganttApp', ['ngRoute', 'ngMaterial', 'angular-google-gapi', 'ngFileUpload', 'ngFitText', 'ngMdIcons'])

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


    .filter('leadingZeros', () => {
        return (n:any, len:any) => {
            var num:any = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = ''+num;
            while (num.length < len) {
                num = '0'+num;
            }
            return num;
        }
    })

    .service('GDriveService', ['GAuth', 'GApi', '$q', '$window', '$http', '$mdDialog', '$mdToast', GDriveService])
    .service('ProjectService', ['GDriveService', '$mdDialog', '$window', '$mdToast', ProjectService])

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
                templateUrl: 'welcome/welcome.html',
                controller: WelcomeController,
                controllerAs: "welcomeCtrl"
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




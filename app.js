"use strict";
var LayoutController_1 = require('./components/LayoutController');
var ProjectService_1 = require('./components/ProjectService');
var SidenavController_1 = require('./components/SidenavController');
var GanttController_1 = require("./gantt/GanttController");
var GDriveService_1 = require("./components/GDriveService");
var WelcomeController_1 = require("./welcome/WelcomeController");
var ganttApp = angular.module('ganttApp', ['ngRoute', 'ngMaterial', 'angular-google-gapi', 'ngFileUpload', 'ngFitText', 'ngMdIcons'])
    .directive('resizable', function () {
    return {
        restrict: 'A',
        scope: {
            callback: '&onResize'
        },
        link: function postLink(scope, elem, attrs) {
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
    .filter('leadingZeros', function () {
    return function (n, len) {
        var num = parseInt(n, 10);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        num = '' + num;
        while (num.length < len) {
            num = '0' + num;
        }
        return num;
    };
})
    .service('GDriveService', ['GAuth', 'GApi', '$q', '$window', '$http', '$mdDialog', '$mdToast', GDriveService_1.GDriveService])
    .service('ProjectService', ['GDriveService', '$mdDialog', '$window', '$mdToast', ProjectService_1.ProjectService])
    .controller('LayoutController', ['$mdBottomSheet', '$q', '$mdSidenav', LayoutController_1.LayoutController])
    .controller('SidenavController', ['$location', 'ProjectService', SidenavController_1.SidenavController])
    .config(function ($routeProvider, $mdThemingProvider, $mdIconProvider) {
    $routeProvider
        .when('/gantt', {
        templateUrl: 'gantt/gantt.html',
        controller: GanttController_1.GanttCtrl,
        controllerAs: "gantt"
    })
        .otherwise({
        templateUrl: 'welcome/welcome.html',
        controller: WelcomeController_1.WelcomeController,
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
//# sourceMappingURL=app.js.map
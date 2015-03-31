/// <reference path="../references.ts" />
var app;
(function (app) {
    'use strict';
    var MenuCtrl = (function () {
        function MenuCtrl($location, projectService) {
            this.location = $location;
            this.projectService = projectService;
        }
        MenuCtrl.prototype.openFromGoogleDriver = function () {
            alert('Google drive');
        };
        MenuCtrl.prototype.openFromLocal = function () {
            alert('Local');
        };
        MenuCtrl.prototype.new = function () {
            //var project: Project = new Project();
            var project = new Util.ProjectGenerator().generateProject();
            this.showProject(project);
        };
        MenuCtrl.prototype.showProject = function (project) {
            this.projectService.set(project);
            this.location.path("/gantt");
        };
        return MenuCtrl;
    })();
    app.MenuCtrl = MenuCtrl;
})(app || (app = {}));
//# sourceMappingURL=MenuController.js.map
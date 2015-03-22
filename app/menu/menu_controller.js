/// <reference path="../../references.ts" />
var app;
(function (app) {
    'use strict';
    var MenuCtrl = (function () {
        function MenuCtrl(localStorageService, $location) {
            this.storage = localStorageService;
            this.location = $location;
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
            var projectStr = project.toJSON();
            console.log(projectStr);
            this.storage.set("project", projectStr);
            this.location.path("/gantt");
        };
        return MenuCtrl;
    })();
    app.MenuCtrl = MenuCtrl;
})(app || (app = {}));
//# sourceMappingURL=menu_controller.js.map
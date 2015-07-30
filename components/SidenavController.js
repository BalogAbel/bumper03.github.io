/**
 * Created by Balog �bel P�ter on 2015.04.08..
 */
///<reference path='../references.ts' />
var app;
(function (app) {
    var SidenavController = (function () {
        function SidenavController($location, projectService) {
            this.$location = $location;
            this.projectService = projectService;
        }
        SidenavController.prototype.openFromGoogleDriver = function () {
            alert('Google drive');
        };
        SidenavController.prototype.openFromLocal = function () {
            alert('Local');
        };
        SidenavController.prototype.new = function () {
            //var project: Project = new Project();
            var project = Util.ProjectGenerator.generateProject();
            this.showProject(project);
        };
        SidenavController.prototype.showProject = function (project) {
            this.projectService.set(project);
            this.$location.path("/gantt");
        };
        return SidenavController;
    })();
    app.SidenavController = SidenavController;
})(app || (app = {}));
//# sourceMappingURL=SidenavController.js.map
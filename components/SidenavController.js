var ProjectGenerator_1 = require("../gantt/Util/ProjectGenerator");
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
        var project = ProjectGenerator_1.ProjectGenerator.generateProject();
        this.showProject(project);
    };
    SidenavController.prototype.showProject = function (project) {
        this.projectService.set(project);
        this.$location.path("/gantt");
    };
    return SidenavController;
})();
exports.SidenavController = SidenavController;
//# sourceMappingURL=SidenavController.js.map
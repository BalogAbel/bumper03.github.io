var ProjectGenerator_1 = require("../gantt/Util/ProjectGenerator");
var SidenavController = (function () {
    function SidenavController($location, projectService) {
        this.$location = $location;
        this.projectService = projectService;
        this.toggles = [];
    }
    SidenavController.prototype.openFromGoogleDrive = function () {
        this.projectService.loadFromGDrive();
    };
    SidenavController.prototype.openFromLocal = function () {
        alert('Local');
    };
    SidenavController.prototype.saveToGoogleDrive = function () {
        this.projectService.saveToGoogleDrive();
    };
    SidenavController.prototype.saveToLocal = function () {
        this.projectService.saveToLocal();
    };
    SidenavController.prototype.new = function () {
        console.log('new');
        //var project: Project = new Project();
        var project = ProjectGenerator_1.ProjectGenerator.generateProject();
        console.log(project);
        this.showProject(project);
    };
    SidenavController.prototype.toggleMenu = function (menu) {
        var index = this.toggles.indexOf(menu);
        if (index > -1)
            this.toggles.splice(index, 1);
        else
            this.toggles.push(menu);
    };
    SidenavController.prototype.isMenuOpen = function (menu) {
        return this.toggles.indexOf(menu) > -1;
    };
    SidenavController.prototype.showProject = function (project) {
        this.projectService.set(project);
        this.$location.path("/gantt");
    };
    return SidenavController;
})();
exports.SidenavController = SidenavController;
//# sourceMappingURL=SidenavController.js.map
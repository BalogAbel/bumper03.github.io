var Project_1 = require("../gantt/Model/Project");
var ProjectService = (function () {
    function ProjectService() {
        this.project = null;
    }
    ProjectService.prototype.get = function () {
        if (this.project == null) {
            var projectObj = JSON.parse(localStorage.getItem("project"));
            this.project = new Project_1.Project();
            if (projectObj != null) {
                this.project.deserialize(projectObj);
                JSON.retrocycle(this.project);
            }
        }
        return this.project;
    };
    ProjectService.prototype.set = function (project) {
        localStorage.setItem("project", JSON.stringify(JSON.decycle(project)));
        this.project = project;
    };
    return ProjectService;
})();
exports.ProjectService = ProjectService;
//# sourceMappingURL=ProjectService.js.map
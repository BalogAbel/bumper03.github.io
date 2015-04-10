/**
 * Created by Abel on 2015.03.22..
 */
///<reference path='../references.ts' />
var app;
(function (app) {
    var Project = Model.Project;
    var ProjectService = (function () {
        function ProjectService(localStorageService) {
            this.localStorageService = localStorageService;
            this.project = null;
        }
        ProjectService.prototype.get = function () {
            if (this.project == null) {
                var projectObj = JSON.parse(localStorage.getItem("project"));
                this.project = new Project();
                if (projectObj != null) {
                    this.project.deserialize(projectObj);
                    JSON.retrocycle(this.project);
                }
                console.log(this.project);
            }
            return this.project;
        };
        ProjectService.prototype.set = function (project) {
            localStorage.setItem("project", JSON.stringify(JSON.decycle(project)));
            //console.log(localStorage.getItem("project"));
            this.project = project;
        };
        return ProjectService;
    })();
    app.ProjectService = ProjectService;
})(app || (app = {}));
//# sourceMappingURL=ProjectService.js.map
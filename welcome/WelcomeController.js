"use strict";
var ProjectGenerator_1 = require("../gantt/Util/ProjectGenerator");
var Project_1 = require("../gantt/Model/Project");
var WelcomeController = (function () {
    function WelcomeController($location, ProjectService) {
        this.$location = $location;
        this.ProjectService = ProjectService;
        this.open = false;
    }
    WelcomeController.prototype.newEmpty = function () {
        var project = new Project_1.Project();
        this.showProject(project);
    };
    WelcomeController.prototype.newExample = function () {
        var project = ProjectGenerator_1.ProjectGenerator.generateProject();
        this.showProject(project);
    };
    WelcomeController.prototype.openFromGoogleDrive = function () {
        var _this = this;
        console.log(this);
        this.ProjectService.loadFromGDrive().then(function (project) {
            _this.showProject(project);
        });
    };
    WelcomeController.prototype.upload = function (files) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (e) {
            var projectObj = JSON.parse(e.srcElement.result);
            var project = new Project_1.Project();
            if (projectObj != null) {
                project.deserialize(projectObj);
                JSON.retrocycle(project);
                _this.showProject(project);
            }
            console.log(project);
        };
        reader.readAsText(files[0]);
    };
    WelcomeController.prototype.showProject = function (project) {
        this.ProjectService.set(project);
        this.$location.path("/gantt");
    };
    return WelcomeController;
}());
exports.WelcomeController = WelcomeController;
//# sourceMappingURL=WelcomeController.js.map
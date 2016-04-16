"use strict";
var Dependency_1 = require("../../Model/Dependency");
var ResourceUsage_1 = require("../../Model/Resources/ResourceUsage");
var TaskDetailController = (function () {
    function TaskDetailController($mdDialog, project, task) {
        this.$mdDialog = $mdDialog;
        this.project = project;
        this.task = task;
        this.newResourceUsage = new ResourceUsage_1.ResourceUsage();
        this.newDependency = new Dependency_1.Dependency();
    }
    TaskDetailController.prototype.addDependency = function () {
        this.task.dependencies.push(this.newDependency);
        this.newDependency = new Dependency_1.Dependency();
    };
    TaskDetailController.prototype.removeDependency = function (dependency) {
        var idx = this.task.dependencies.indexOf(dependency);
        if (idx == -1)
            return;
        this.task.dependencies.splice(idx, 1);
    };
    TaskDetailController.prototype.addResourceUsage = function () {
        this.task.resourceUsages.push(this.newResourceUsage);
        this.newResourceUsage = new ResourceUsage_1.ResourceUsage();
    };
    TaskDetailController.prototype.removeResourceUsage = function (resourceUsage) {
        var idx = this.task.resourceUsages.indexOf(resourceUsage);
        if (idx == -1)
            return;
        this.task.resourceUsages.splice(idx, 1);
    };
    TaskDetailController.prototype.save = function () {
        this.$mdDialog.hide(this.task);
    };
    TaskDetailController.prototype.cancel = function () {
        this.$mdDialog.hide();
    };
    return TaskDetailController;
}());
exports.TaskDetailController = TaskDetailController;
//# sourceMappingURL=TaskDetailController.js.map
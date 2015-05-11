///<reference path='../../../references.ts' />
var app;
(function (app) {
    var Schedulable = Model.Schedulable;
    var Dependency = Model.Dependency;
    var ResourceUsage = Model.Resources.ResourceUsage;
    var TaskDetailController = (function () {
        function TaskDetailController(project) {
            this.project = project;
            this.newDependency = new Dependency();
            this.newResourceUsage = new ResourceUsage();
            this.task = new Schedulable();
            this.isSummary = this.task instanceof Model.Summary;
            this.hasEarliestConstraint = this.task.earliestStartConstraint != null;
            this.opened = false;
        }
        TaskDetailController.prototype.addDependency = function () {
            this.task.predecessors.push(this.newDependency);
            var successor = new Dependency();
            successor.task = this.task;
            successor.lag = this.newDependency.lag;
            this.newDependency.task.successors.push(successor);
            this.newDependency = new Dependency();
            this.newResourceUsage = new ResourceUsage();
        };
        TaskDetailController.prototype.addResourceUsage = function () {
            this.task.resourceUsages.push(this.newResourceUsage);
            this.newResourceUsage = new ResourceUsage();
        };
        return TaskDetailController;
    })();
    app.TaskDetailController = TaskDetailController;
})(app || (app = {}));
//# sourceMappingURL=TaskDetailController.js.map
/**
 * Created by Balog �bel P�ter on 2015.03.30..
 */
///<reference path='../../../references.ts' />
var app;
(function (app) {
    var TaskDetailController = (function () {
        function TaskDetailController(task) {
            this.task = task;
            this.isSummary = task instanceof Model.Summary;
            this.hasEarliestConstraint = task.earliestStartConstraint != null;
            this.opened = false;
        }
        TaskDetailController.prototype.openEarliestConstraintDatePicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            this.opened = true;
        };
        return TaskDetailController;
    })();
    app.TaskDetailController = TaskDetailController;
})(app || (app = {}));
//# sourceMappingURL=TaskDetailController.js.map
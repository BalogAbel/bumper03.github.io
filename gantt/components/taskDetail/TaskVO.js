"use strict";
var Summary_1 = require("../../Model/Summary");
var Dependency_1 = require("../../Model/Dependency");
var Duration_1 = require("../../Model/WorkingCalendar/Duration");
var TaskVO = (function () {
    function TaskVO() {
        this.isSummary = false;
        this.hasEarliestConstraint = false;
        this.isNew = true;
        this.hasEarliestConstraint = false;
        this.duration = new Duration_1.Duration();
        this.isSummary = false;
        this.dependencies = [];
        this.resourceUsages = [];
        this.name = "";
    }
    TaskVO.fromTask = function (task) {
        var result = new TaskVO();
        result.name = task.name;
        result.isNew = false;
        result.description = task.description;
        result.hasEarliestConstraint = task.earliestStartConstraint != null;
        result.earliestStartConstraint = result.hasEarliestConstraint ? new Date(task.earliestStartConstraint.getTime()) : null;
        task.resourceUsages.forEach(function (res) { return result.resourceUsages.push(res); });
        result.parent = task.parent;
        task.predecessors.forEach(function (dep) { return result.dependencies.push(dep); });
        if (task instanceof Summary_1.Summary) {
            var summary = task;
            result.isSummary = true;
        }
        else {
            var schedulable = task;
            result.isSummary = false;
            result.duration = Duration_1.Duration.clone(schedulable.duration);
        }
        return result;
    };
    TaskVO.prototype.merge = function (source) {
        source.name = this.name;
        source.description = this.description;
        source.earliestStartConstraint = this.hasEarliestConstraint ? this.earliestStartConstraint : null;
        if (!this.isSummary) {
            var schedulable = source;
            schedulable.duration = this.duration;
        }
        var oldParentIdx = source.parent == null ? -1 : source.parent.tasks.indexOf(source);
        if (oldParentIdx != -1)
            source.parent.tasks.splice(oldParentIdx, 1);
        source.parent = this.parent;
        if (source.parent != null) {
            source.parent.tasks.push(source);
        }
        source.resourceUsages = [];
        this.resourceUsages.forEach(function (res) {
            source.resourceUsages.push(res);
        });
        source.predecessors.forEach(function (pred) {
            var idx = pred.task.successors.indexOf(pred);
            if (idx == -1)
                pred.task.successors.splice(idx, 1);
        });
        source.predecessors = [];
        this.dependencies.forEach(function (dep) {
            source.predecessors.push(dep);
            var newDep = new Dependency_1.Dependency();
            newDep.task = source;
            newDep.lag = dep.lag;
            dep.task.successors.push(newDep);
        });
        return source;
    };
    return TaskVO;
}());
exports.TaskVO = TaskVO;
//# sourceMappingURL=TaskVO.js.map
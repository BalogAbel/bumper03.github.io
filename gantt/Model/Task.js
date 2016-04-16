"use strict";
console.log('Task');
var ResourceUsage_1 = require("./Resources/ResourceUsage");
var HashSet_1 = require("../Util/HashSet");
var Dependency_1 = require("./Dependency");
//abstract class (no TS support for that :( ), do not instantiate!
var Task = (function () {
    function Task() {
        this.predecessors = [];
        this.successors = [];
        this.parent = null;
        this.earliestStartConstraint = null;
        this.resourceUsages = [];
    }
    Task.prototype.reset = function () {
        this.start = null;
        this.finish = null;
    };
    Task.prototype.getSubTasks = function () {
        return new HashSet_1.HashSet();
    };
    Task.prototype.getAllTasks = function () {
        return [];
    };
    /**
     * Returns the task's predecessors, not including transitive predecessors
     * @returns {Dependency[]}
     */
    Task.prototype.getPredecessors = function () {
        var result = [];
        var that = this;
        for (var i = 0; i < this.predecessors.length; i++) {
            var subTasks = this.predecessors[i].task.getSubTasks();
            subTasks.each(function (task) {
                var dep = new Dependency_1.Dependency();
                dep.task = task;
                dep.lag = that.predecessors[i].lag;
                result.push(dep);
                return true;
            });
        }
        if (this.parent != null) {
            var deps = this.parent.getPredecessors();
            for (var i = 0; i < deps.length; i++) {
                result.push(deps[i]);
            }
        }
        return result;
    };
    /**
     * Returns the task's successors, not including transitive successors
     * @returns {Dependency[]}
     */
    Task.prototype.getSuccessors = function () {
        var result = [];
        var that = this;
        for (var i = 0; i < this.successors.length; i++) {
            var subTasks = this.successors[i].task.getSubTasks();
            subTasks.each(function (task) {
                var dep = new Dependency_1.Dependency();
                dep.task = task;
                dep.lag = that.successors[i].lag;
                result.push(dep);
                return true;
            });
        }
        if (this.parent != null) {
            var deps = this.parent.getSuccessors();
            for (var i = 0; i < deps.length; i++) {
                result.push(deps[i]);
            }
        }
        return result;
    };
    Task.prototype.hash = function () {
        return this.id;
    };
    Task.prototype.getEarliestStartConstraint = function () {
        if (this.parent != null) {
            var parentDate = this.parent.getEarliestStartConstraint();
            if (this.earliestStartConstraint == null ||
                (parentDate != null && parentDate.getTime() > this.earliestStartConstraint.getTime())) {
                return parentDate;
            }
        }
        return this.earliestStartConstraint;
    };
    Task.prototype.getResourceUsages = function () {
        var result = this.resourceUsages;
        if (this.parent != null) {
            result = result.concat(this.parent.getResourceUsages());
        }
        return result;
    };
    Task.prototype.deserialize = function (input) {
        this.id = input.id;
        this.name = input.name;
        this.description = input.description;
        if (input.successors != null) {
            for (var i = 0; i < input.successors.length; i++) {
                this.successors.push(new Dependency_1.Dependency().deserialize(input.successors[i]));
            }
        }
        if (input.predecessors != null) {
            for (var i = 0; i < input.predecessors.length; i++) {
                this.predecessors.push(new Dependency_1.Dependency().deserialize(input.predecessors[i]));
            }
        }
        this.parent = input.parent != null ? Task.deserializeHelper(input.parent) : null;
        this.start = input.start != null ? new Date(input.start) : null;
        this.finish = input.finish != null ? new Date(input.finish) : null;
        this.earliestStartConstraint = input.earliestStartConstraint != null ? new Date(input.earliestStartConstraint) : null;
        if (input.resourceUsages != null) {
            for (var i = 0; i < input.resourceUsages.length; i++) {
                this.resourceUsages.push(new ResourceUsage_1.ResourceUsage().deserialize(input.resourceUsages[i]));
            }
        }
        return this;
    };
    Task.deserializeHelper = function (task) {
        if (task.hasOwnProperty('tasks'))
            return new Summary_1.Summary().deserialize(task);
        if (task.hasOwnProperty('duration'))
            return new Schedulable_1.Schedulable().deserialize(task);
        return task;
        //throw "Not a task: " + task;
    };
    Task.prototype.getAllSummaries = function () {
        return [];
    };
    return Task;
}());
exports.Task = Task;
var Schedulable_1 = require("./Schedulable");
var Summary_1 = require("./Summary");
//# sourceMappingURL=Task.js.map
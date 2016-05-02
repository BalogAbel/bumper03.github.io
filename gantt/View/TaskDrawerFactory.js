"use strict";
var SummaryDrawer_1 = require("./SummaryDrawer");
var Summary_1 = require("../Model/Summary");
var SchedulableDrawer_1 = require("./SchedulableDrawer");
var Schedulable_1 = require("../Model/Schedulable");
var DependencyDrawer_1 = require("./DependencyDrawer");
var TaskDrawerFactory = (function () {
    function TaskDrawerFactory() {
    }
    TaskDrawerFactory.reset = function () {
        this.taskDrawers = [];
    };
    TaskDrawerFactory.getTaskDrawer = function (task) {
        var drawer;
        if (task instanceof Summary_1.Summary)
            drawer = TaskDrawerFactory.getSummaryDrawer(task);
        else if (task instanceof Schedulable_1.Schedulable)
            drawer = new SchedulableDrawer_1.SchedulableDrawer();
        else
            throw ("Task type error");
        drawer.task = task;
        this.taskDrawers.push(drawer);
        return drawer;
    };
    TaskDrawerFactory.getSummaryDrawer = function (summary) {
        var sumDrawer = new SummaryDrawer_1.SummaryDrawer();
        sumDrawer.task = summary;
        for (var i = 0; i < summary.tasks.length; i++) {
            var drawer = TaskDrawerFactory.getTaskDrawer(summary.tasks[i]);
            sumDrawer.subDrawers.push(drawer);
            this.taskDrawers.push(drawer);
        }
        return sumDrawer;
    };
    TaskDrawerFactory.getDependencyDrawers = function () {
        var _this = this;
        var result = [];
        for (var i = 0; i < this.taskDrawers.length; i++) {
            for (var j = 0; j < this.taskDrawers[i].task.successors.length; j++) {
                var fromDrawer;
                this.taskDrawers.forEach(function (drawer) {
                    if (drawer.task.id == _this.taskDrawers[i].task.successors[j].task.id)
                        fromDrawer = drawer;
                });
                result.push(new DependencyDrawer_1.DependencyDrawer(this.taskDrawers[i], fromDrawer));
            }
        }
        return result;
    };
    TaskDrawerFactory.taskDrawers = [];
    return TaskDrawerFactory;
}());
exports.TaskDrawerFactory = TaskDrawerFactory;
//# sourceMappingURL=TaskDrawerFactory.js.map
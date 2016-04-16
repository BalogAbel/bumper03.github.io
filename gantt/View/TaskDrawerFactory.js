"use strict";
var SummaryDrawer_1 = require("./SummaryDrawer");
var Summary_1 = require("../Model/Summary");
var SchedulableDrawer_1 = require("./SchedulableDrawer");
var Schedulable_1 = require("../Model/Schedulable");
var TaskDrawerFactory = (function () {
    function TaskDrawerFactory() {
    }
    TaskDrawerFactory.getTaskDrawer = function (task) {
        var drawer;
        if (task instanceof Summary_1.Summary)
            drawer = TaskDrawerFactory.getSummaryDrawer(task);
        else if (task instanceof Schedulable_1.Schedulable)
            drawer = new SchedulableDrawer_1.SchedulableDrawer();
        else
            throw ("Task type error");
        drawer.task = task;
        return drawer;
    };
    TaskDrawerFactory.getSummaryDrawer = function (summary) {
        var sumDrawer = new SummaryDrawer_1.SummaryDrawer();
        sumDrawer.task = summary;
        for (var i = 0; i < summary.tasks.length; i++) {
            sumDrawer.subDrawers.push(TaskDrawerFactory.getTaskDrawer(summary.tasks[i]));
        }
        return sumDrawer;
    };
    return TaskDrawerFactory;
}());
exports.TaskDrawerFactory = TaskDrawerFactory;
//# sourceMappingURL=TaskDrawerFactory.js.map
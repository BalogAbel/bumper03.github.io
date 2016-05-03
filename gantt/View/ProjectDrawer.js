"use strict";
var TaskDrawer_1 = require("./TaskDrawer");
var Utils_1 = require("./Utils");
var TimeLineDrawer_1 = require("./TimeLineDrawer");
var TaskDrawerFactory_1 = require("./TaskDrawerFactory");
var ProjectDrawer = (function () {
    function ProjectDrawer(project) {
        ProjectDrawer._instance = this;
        this.project = project;
        Utils_1.Utils.startDate = new Date(this.project.start.getTime());
        Utils_1.Utils.finishDate = new Date(this.project.finish.getTime());
        Utils_1.Utils.startDate.setDate(Utils_1.Utils.startDate.getDate() - 14);
        Utils_1.Utils.finishDate.setDate(Utils_1.Utils.finishDate.getDate() + 14);
        this.handleAddDates();
    }
    ProjectDrawer.prototype.draw = function () {
        this.generateTaskDrawers();
        var taskStage = new Konva.Stage({
            container: 'tasks',
            width: 400,
            height: 100
        });
        taskStage.clear();
        TaskDrawer_1.TaskDrawer.actualPosition = { x: 0, y: Utils_1.Utils.taskLineHeight * 1.5 };
        this.taskLayer = new Konva.Layer();
        this.timeLineLayer = new Konva.Layer();
        for (var i = 0; i < this.taskDrawers.length; i++) {
            this.taskDrawers[i].draw(this.taskLayer, this.timeLineLayer);
        }
        this.arrowGroup = new Konva.Group();
        this.depDrawers = TaskDrawerFactory_1.TaskDrawerFactory.getDependencyDrawers();
        for (var i = 0; i < this.depDrawers.length; i++) {
            this.depDrawers[i].drawArrow(this.arrowGroup);
            e;
        }
        this.timeLineLayer.add(this.arrowGroup);
        taskStage.add(this.taskLayer);
        taskStage.height(TaskDrawer_1.TaskDrawer.actualPosition.y);
        var timeLineStage = new Konva.Stage({
            container: 'timeLine',
            width: Utils_1.Utils.getCanvasWidth(),
            height: 100
        });
        timeLineStage.clear();
        var timelineDrawer = new TimeLineDrawer_1.TimeLineDrawer();
        timelineDrawer.draw(this.timeLineLayer);
        timeLineStage.add(this.timeLineLayer);
        timeLineStage.height(TaskDrawer_1.TaskDrawer.actualPosition.y);
        this.scrollToDate(this.project.start);
    };
    ProjectDrawer.refresh = function () {
        if (ProjectDrawer._instance != null) {
            ProjectDrawer._instance.update();
        }
    };
    ProjectDrawer.prototype.update = function () {
        var _this = this;
        this.arrowGroup.removeChildren();
        this.project.schedule();
        for (var i = 0; i < this.taskDrawers.length; i++) {
            this.taskDrawers[i].update(this.timeLineLayer);
        }
        setTimeout(function () {
            for (var i = 0; i < _this.depDrawers.length; i++) {
                _this.arrowGroup.add(_this.depDrawers[i].getArrow());
            }
        }, 300);
        //ProjectDrawer._instance.draw();
    };
    ProjectDrawer.prototype.generateTaskDrawers = function () {
        this.taskDrawers = [];
        TaskDrawerFactory_1.TaskDrawerFactory.reset();
        for (var i = 0; i < this.project.tasks.length; i++) {
            this.taskDrawers.push(TaskDrawerFactory_1.TaskDrawerFactory.getTaskDrawer(this.project.tasks[i]));
        }
    };
    ProjectDrawer.prototype.handleAddDates = function () {
        var that = this;
        $("#addBefore").click(function () {
            var centerDate = that.getCenterDate();
            Utils_1.Utils.startDate.setDate(Utils_1.Utils.startDate.getDate() - 7);
            that.draw();
            that.centerDate(centerDate);
        });
        $("#addAfter").click(function () {
            var centerDate = that.getCenterDate();
            Utils_1.Utils.finishDate.setDate(Utils_1.Utils.finishDate.getDate() + 7);
            that.draw();
            that.centerDate(centerDate);
        });
    };
    ProjectDrawer.prototype.changeZoom = function (zoomLevel) {
        var centerDate = this.getCenterDate();
        Utils_1.Utils.dayWidth = zoomLevel;
        var visibleDays = $('#timeLineWrapper').width() / Utils_1.Utils.dayWidth;
        var diff = this.dateToDays(Utils_1.Utils.finishDate) - this.dateToDays(Utils_1.Utils.startDate) - visibleDays;
        if (diff < 0) {
            Utils_1.Utils.startDate = this.addDays(Utils_1.Utils.startDate, (diff / 2) - 1);
            Utils_1.Utils.finishDate = this.addDays(Utils_1.Utils.finishDate, (-diff / 2) + 1);
        }
        else if (diff > 30) {
            var newStartDate = this.addDays(Utils_1.Utils.startDate, (diff / 2));
            if (newStartDate.getTime() > this.project.start.getTime()) {
                Utils_1.Utils.startDate = new Date(this.project.start.getTime());
            }
            else {
                Utils_1.Utils.startDate = newStartDate;
            }
            var newEndDate = this.addDays(Utils_1.Utils.finishDate, -(diff / 2));
            if (newEndDate.getTime() < this.project.finish.getTime()) {
                Utils_1.Utils.finishDate = new Date(this.project.finish.getTime());
            }
            else {
                Utils_1.Utils.finishDate = newEndDate;
            }
        }
        this.draw();
        this.centerDate(centerDate);
    };
    ProjectDrawer.prototype.centerDate = function (date) {
        var div = $("#timeLineWrapper");
        div.scrollLeft(Utils_1.Utils.dateToPosition(date) - div.width() / 2.0);
    };
    ProjectDrawer.prototype.scrollToDate = function (date) {
        $("#timeLineWrapper").scrollLeft(Utils_1.Utils.dateToPosition(date));
    };
    ProjectDrawer.prototype.getCenterDate = function () {
        var div = $("#timeLineWrapper");
        return Utils_1.Utils.positionToDate(div.scrollLeft() + div.width() / 2.0);
    };
    ProjectDrawer.prototype.dateToDays = function (date) {
        return date.getTime() / 1000 / 60 / 60 / 24;
    };
    ProjectDrawer.prototype.addDays = function (date, days) {
        var result = new Date(date.getTime());
        result.setDate(result.getDate() + days);
        return result;
    };
    ProjectDrawer._instance = null;
    return ProjectDrawer;
}());
exports.ProjectDrawer = ProjectDrawer;
//# sourceMappingURL=ProjectDrawer.js.map
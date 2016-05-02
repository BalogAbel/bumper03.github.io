"use strict";
var Utils_1 = require("./Utils");
var ProjectDrawer_1 = require("./ProjectDrawer");
var TaskDrawer = (function () {
    function TaskDrawer() {
        this.isNormalClick = true;
        this.dragStart = 0;
    }
    TaskDrawer.prototype.draw = function (layer, timeLineLayer) {
        if (TaskDrawer.taskNameSample == null || TaskDrawer.taskTimeLineSample == null)
            this.createSamples();
        this.nameGroup = TaskDrawer.taskNameSample.clone({});
        var taskName = this.nameGroup.find('.TaskName')[0];
        taskName.text(this.task.name);
        this.nameGroup.position(TaskDrawer.actualPosition);
        this.nameGroup.on("dblclick", function (evt) {
            var scope = angular.element($("#gantt")).scope().gantt;
            scope.editTask(that.task);
        });
        layer.add(this.nameGroup);
        var line = TaskDrawer.taskTimeLineSample.clone({});
        var taskLine = line.find('.TaskLine')[0];
        taskLine.points([
            0, 0,
            Utils_1.Utils.getCanvasWidth(), 0
        ]);
        line.position({ x: 0, y: TaskDrawer.actualPosition.y });
        timeLineLayer.add(line);
        TaskDrawer.actualPosition.y += Utils_1.Utils.taskLineHeight;
        var that = this;
        this.taskGroup.on("dblclick", function (evt) {
            var scope = angular.element($("#gantt")).scope().gantt;
            scope.editTask(that.task);
        });
        this.taskGroup.on("dragstart", function (evt) {
            that.dragStart = evt.target.getAbsolutePosition().x;
            if (!that.isNormalClick) {
                var scope = angular.element($("#gantt")).scope().gantt;
                scope.editTask(that.task);
                return;
            }
            that.isNormalClick = false;
            setTimeout(function () {
                that.isNormalClick = true;
            }, 500);
        });
        this.taskGroup.on("dragend", function (evt) {
            var move = Math.abs(that.dragStart = evt.target.getAbsolutePosition().x - that.dragStart);
            if (!that.isNormalClick && move < 10)
                evt.target.getAbsolutePosition().x = that.dragStart;
            that.dragged(evt);
        });
    };
    TaskDrawer.prototype.createSamples = function () {
        this.createTaskNameSample();
        this.createTaskTimeLineSample();
    };
    TaskDrawer.prototype.createTaskNameSample = function () {
        TaskDrawer.taskNameSample = new Konva.Group({
            x: 0,
            y: 0
        });
        var taskName = new Konva.Text({
            name: 'TaskName',
            text: 'Sample task name',
            fontSize: Utils_1.Utils.taskLineHeight * 2 / 3,
            fontFamily: 'Roboto',
            fill: '#009688',
            y: Utils_1.Utils.taskLineHeight * 0.2
        });
        var line = new Konva.Line({
            name: 'TaskLine',
            stroke: 'grey',
            strokeWidth: 0.5,
            x: 0,
            y: 0,
            points: [
                0, 0,
                Utils_1.Utils.getCanvasWidth(), 0
            ]
        });
        TaskDrawer.taskNameSample.add(line);
        TaskDrawer.taskNameSample.add(taskName);
    };
    TaskDrawer.prototype.createTaskTimeLineSample = function () {
        TaskDrawer.taskTimeLineSample = new Konva.Group({
            x: 0,
            y: 0
        });
        var line = new Konva.Line({
            name: 'TaskLine',
            stroke: 'grey',
            strokeWidth: 0.5,
            x: 0,
            y: 0,
            points: [
                0, 0,
                Utils_1.Utils.getCanvasWidth(), 0
            ]
        });
        TaskDrawer.taskTimeLineSample.add(line);
    };
    TaskDrawer.prototype.dragged = function (evt) {
        this.task.earliestStartConstraint = Utils_1.Utils.positionToDate(evt.target.getAbsolutePosition().x);
        ProjectDrawer_1.ProjectDrawer.refresh();
    };
    TaskDrawer.prototype.update = function (layer) {
        this.nameGroup.find('.TaskName')[0].text(this.task.name);
        this.nameGroup.getLayer().draw();
        this.moveToDate(layer);
        this.animateWidth(layer);
    };
    TaskDrawer.prototype.moveToDate = function (layer) {
        var _this = this;
        var slideToPosX = Utils_1.Utils.dateToPosition(this.task.start);
        var step = (slideToPosX - this.taskGroup.getAbsolutePosition().x) / 100;
        var forward = this.taskGroup.getAbsolutePosition().x < slideToPosX;
        var anim = new Konva.Animation(function (frame) {
            var position = _this.taskGroup.getAbsolutePosition();
            _this.taskGroup.setAbsolutePosition({ x: position.x + frame.timeDiff * step, y: position.y });
            if ((forward && _this.taskGroup.getAbsolutePosition().x > slideToPosX) || (!forward && _this.taskGroup.getAbsolutePosition().x < slideToPosX)) {
                anim.stop();
            }
        }, layer);
        anim.start();
    };
    TaskDrawer.prototype.animateWidth = function (layer) {
        var node = this.taskGroup.find('.durationRect')[0];
        var newWidth = Utils_1.Utils.dateToPosition(this.task.finish) - Utils_1.Utils.dateToPosition(this.task.start);
        var step = (newWidth - node.width()) / 100;
        var grow = node.getWidth() < newWidth;
        var anim = new Konva.Animation(function (frame) {
            node.width(node.width() + frame.timeDiff * step);
            if ((grow && node.width() > newWidth) || (!grow && node.width() < newWidth)) {
                anim.stop();
                node.width(newWidth);
            }
        }, layer);
        anim.start();
    };
    TaskDrawer.taskDragged = function (node) {
        node.blurRadius(10);
        node.scale({ x: 1, y: 1.1 });
        node.moveToTop();
    };
    TaskDrawer.taskDropped = function (node) {
        node.blurRadius(10);
        node.scale({ x: 1, y: 1.1 });
    };
    return TaskDrawer;
}());
exports.TaskDrawer = TaskDrawer;
//# sourceMappingURL=TaskDrawer.js.map
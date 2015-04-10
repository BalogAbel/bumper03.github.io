///<reference path='../../references.ts'/>
var View;
(function (View) {
    var Utils = View.Utils;
    var TaskDrawer = (function () {
        function TaskDrawer() {
        }
        TaskDrawer.prototype.draw = function (layer, timeLineLayer) {
            if (TaskDrawer.taskNameSample == null || TaskDrawer.taskTimeLineSample == null)
                this.createSamples();
            var node = TaskDrawer.taskNameSample.clone({});
            var taskName = node.find('.TaskName')[0];
            taskName.name('TaskName' + this.task.id);
            taskName.text(this.task.name);
            node.position(TaskDrawer.actualPosition);
            layer.add(node);
            var line = TaskDrawer.taskTimeLineSample.clone({});
            var taskLine = line.find('.TaskLine')[0];
            taskLine.points([
                0,
                0,
                Utils.getCanvasWidth(),
                0
            ]);
            line.position({ x: 0, y: TaskDrawer.actualPosition.y });
            timeLineLayer.add(line);
            TaskDrawer.actualPosition.y += Utils.taskLineHeight;
            var that = this;
            this.taskGroup.on("dragend", function (evt) {
                that.dragged(evt);
            });
            //this.taskGroup.on("dragstart", function (evt) {
            //    TaskDrawer.taskDragged(<Konva.INode>evt.target)
            //});
            //this.taskGroup.on("dragend", function (evt) {
            //    TaskDrawer.taskDropped(<Konva.INode>evt.target);
            //});
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
                fontSize: Utils.taskLineHeight * 2 / 3,
                fontFamily: 'Roboto',
                fill: '#009688',
                y: Utils.taskLineHeight * 0.2
            });
            var line = new Konva.Line({
                name: 'TaskLine',
                stroke: 'grey',
                strokeWidth: 0.5,
                x: 0,
                y: 0,
                points: [
                    0,
                    0,
                    Utils.getCanvasWidth(),
                    0
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
                    0,
                    0,
                    Utils.getCanvasWidth(),
                    0
                ]
            });
            TaskDrawer.taskTimeLineSample.add(line);
        };
        TaskDrawer.prototype.dragged = function (evt) {
            this.task.earliestStartConstraint = Utils.positionToDate(evt.target.getAbsolutePosition().x);
            View.ProjectDrawer.refresh();
        };
        TaskDrawer.prototype.update = function (layer) {
            this.moveToDate(layer);
            this.animateWidth(layer);
        };
        TaskDrawer.prototype.moveToDate = function (layer) {
            var _this = this;
            var slideToPosX = Utils.dateToPosition(this.task.start);
            var step = (slideToPosX - this.taskGroup.getAbsolutePosition().x) / 100;
            var forward = this.taskGroup.getAbsolutePosition().x < slideToPosX;
            var anim = new Konva.Animation(function (frame) {
                var position = _this.taskGroup.getAbsolutePosition();
                _this.taskGroup.setAbsolutePosition({ x: position.x + frame.timeDiff * step, y: position.y });
                if ((forward && _this.taskGroup.getAbsolutePosition().x > slideToPosX) || (!forward && _this.taskGroup.getAbsolutePosition().x < slideToPosX)) {
                    anim.stop();
                    _this.taskGroup.setAbsolutePosition({ x: slideToPosX, y: position.y });
                }
            }, layer);
            anim.start();
        };
        TaskDrawer.prototype.animateWidth = function (layer) {
            var node = this.taskGroup.find('.durationRect')[0];
            var newWidth = Utils.dateToPosition(this.task.finish) - Utils.dateToPosition(this.task.start);
            var step = (newWidth - node.width()) / 100;
            var grow = node.getWidth() < newWidth;
            console.log("Width anim for " + this.task.name + ": old width: " + node.width() + ", new width: " + newWidth);
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
    })();
    View.TaskDrawer = TaskDrawer;
})(View || (View = {}));
//# sourceMappingURL=TaskDrawer.js.map
import {Utils} from "./Utils";
import {Task} from "../Model/Task";
import {GanttCtrl} from "../GanttController";
import {ProjectDrawer} from "./ProjectDrawer";

export class TaskDrawer {
    task:Task;
    private static taskNameSample:Konva.Group;
    private static taskTimeLineSample:Konva.Group;
    static actualPosition:Konva.Vector2d;

    private isNormalClick = true;
    private dragStart = 0;

    public taskGroup:Konva.Group;
    public nameGroup:Konva.Group;
    public arrowGroup:Konva.Group;

    draw(layer:Konva.Layer, timeLineLayer:Konva.Layer) {
        if (TaskDrawer.taskNameSample == null || TaskDrawer.taskTimeLineSample == null)
            this.createSamples();

        this.nameGroup = <Konva.Group>TaskDrawer.taskNameSample.clone({});

        var taskName = <Konva.Text>this.nameGroup.find('.TaskName')[0];
        taskName.text(this.task.name);


        this.nameGroup.position(TaskDrawer.actualPosition);
        this.nameGroup.on("dblclick", (evt:any) => {
            var scope = <GanttCtrl>(<any>angular.element($("#gantt")).scope()).gantt;
            scope.editTask(that.task);
        });
        layer.add(this.nameGroup);

        var line = <Konva.Group>TaskDrawer.taskTimeLineSample.clone({});
        var taskLine = <Konva.Line>line.find('.TaskLine')[0];
        taskLine.points([
            0, 0,
            Utils.getCanvasWidth(), 0
        ]);
        line.position({x: 0, y: TaskDrawer.actualPosition.y});

        timeLineLayer.add(line);

        TaskDrawer.actualPosition.y += Utils.taskLineHeight;

        var that = this;
        this.taskGroup.on("dblclick", (evt:any) => {
            var scope = <GanttCtrl>(<any>angular.element($("#gantt")).scope()).gantt;
            scope.editTask(that.task);
        });
        this.taskGroup.on("dragstart", function (evt:any) {
            that.dragStart = evt.target.getAbsolutePosition().x;
            if (!that.isNormalClick) {
                var scope = <GanttCtrl>(<any>angular.element($("#gantt")).scope()).gantt;
                scope.editTask(that.task);
                return;
            }
            that.isNormalClick = false;
            setTimeout(() => {
                that.isNormalClick = true;
            }, 500);
        });
        this.taskGroup.on("dragend", function (evt:any) {
            var move = Math.abs(that.dragStart = evt.target.getAbsolutePosition().x - that.dragStart);
            if (!that.isNormalClick && move < 10) evt.target.getAbsolutePosition().x = that.dragStart;
            that.dragged(evt);
        });

    }

    createSamples() {
        this.createTaskNameSample();
        this.createTaskTimeLineSample();
    }


    createTaskNameSample() {
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
                0, 0,
                Utils.getCanvasWidth(), 0
            ]
        });

        TaskDrawer.taskNameSample.add(line);
        TaskDrawer.taskNameSample.add(taskName);

    }

    createTaskTimeLineSample() {
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
                Utils.getCanvasWidth(), 0
            ]
        });

        TaskDrawer.taskTimeLineSample.add(line);
    }

    private dragged(evt:any) {
        this.task.earliestStartConstraint = Utils.positionToDate(evt.target.getAbsolutePosition().x);
        ProjectDrawer.refresh();
    }

    update(layer:Konva.Layer):void {
        (<Konva.Text>this.nameGroup.find('.TaskName')[0]).text(this.task.name);
        this.nameGroup.getLayer().draw();
        this.moveToDate(layer);
        this.animateWidth(layer);

    }

    moveToDate(layer:Konva.Layer) {
        var slideToPosX = Utils.dateToPosition(this.task.start);
        var step = (slideToPosX - this.taskGroup.getAbsolutePosition().x) / 100;
        var forward = this.taskGroup.getAbsolutePosition().x < slideToPosX;
        var anim = new Konva.Animation((frame:any) => {
            var position = this.taskGroup.getAbsolutePosition();
            this.taskGroup.setAbsolutePosition({x: position.x + frame.timeDiff * step, y: position.y});
            if ((forward && this.taskGroup.getAbsolutePosition().x > slideToPosX) || (!forward && this.taskGroup.getAbsolutePosition().x < slideToPosX)) {
                anim.stop();
            }
        }, layer);
        anim.start();
    }

    animateWidth(layer:Konva.Layer) {
        var node = <Konva.Rect>this.taskGroup.find('.durationRect')[0];
        var newWidth = Utils.dateToPosition(this.task.finish) - Utils.dateToPosition(this.task.start);
        var step = (newWidth - node.width()) / 100;
        var grow = node.getWidth() < newWidth;
        var anim = new Konva.Animation((frame:any) => {
            node.width(node.width() + frame.timeDiff * step);
            if ((grow && node.width() > newWidth) || (!grow && node.width() < newWidth)) {
                anim.stop();
                node.width(newWidth);
            }
        }, layer);
        anim.start();
    }


    public static taskDragged(node:Konva.Node) {
        node.blurRadius(10);
        node.scale({x: 1, y: 1.1});
        node.moveToTop()
    }

    public static taskDropped(node:Konva.Node) {
        node.blurRadius(10);
        node.scale({x: 1, y: 1.1});
    }
}
import {Project} from "../Model/Project";
import {TaskDrawer} from "./TaskDrawer";
import {Utils} from "./Utils";
import {TimeLineDrawer} from "./TimeLineDrawer";
import {TaskDrawerFactory} from "./TaskDrawerFactory";
import {DependencyDrawer} from "./DependencyDrawer";
export class ProjectDrawer {
    private project:Project;
    private taskDrawers:TaskDrawer[];
    private static _instance:ProjectDrawer = null;
    private taskLayer:Konva.Layer;
    private timeLineLayer:Konva.Layer;
    private arrowGroup: Konva.Group;
    private depDrawers:DependencyDrawer[];

    constructor(project:Project) {
        ProjectDrawer._instance = this;
        this.project = project;

        Utils.startDate = new Date(this.project.start.getTime());
        Utils.finishDate = new Date(this.project.finish.getTime());

        Utils.startDate.setDate(Utils.startDate.getDate() - 14);
        Utils.finishDate.setDate(Utils.finishDate.getDate() + 14);

        this.handleAddDates();

    }

    draw() {
        this.generateTaskDrawers();
        var taskStage = new Konva.Stage({
            container: 'tasks',
            width: 400,
            height: 100
        });
        taskStage.clear();
        TaskDrawer.actualPosition = {x: 0, y: Utils.taskLineHeight * 1.5};

        this.taskLayer = new Konva.Layer();
        this.timeLineLayer = new Konva.Layer();
        for (var i:number = 0; i < this.taskDrawers.length; i++) {
            this.taskDrawers[i].draw(this.taskLayer, this.timeLineLayer);
        }

        this.arrowGroup = new Konva.Group();
        this.depDrawers = TaskDrawerFactory.getDependencyDrawers();
        for(var i = 0; i < this.depDrawers.length; i++) {
            this.depDrawers[i].drawArrow(this.arrowGroup);
        }
        this.timeLineLayer.add(this.arrowGroup);


        taskStage.add(this.taskLayer);
        taskStage.height(TaskDrawer.actualPosition.y);

        var timeLineStage = new Konva.Stage({
            container: 'timeLine',
            width: Utils.getCanvasWidth(),
            height: 100
        });

        timeLineStage.clear();
        var timelineDrawer = new TimeLineDrawer();
        timelineDrawer.draw(this.timeLineLayer);

        timeLineStage.add(this.timeLineLayer);
        timeLineStage.height(TaskDrawer.actualPosition.y);
        this.scrollToDate(this.project.start);

    }

    static refresh() {
        if (ProjectDrawer._instance != null) {
            ProjectDrawer._instance.update();
        }
    }

    update():void {
        this.arrowGroup.removeChildren();
        this.project.schedule();
        for (var i = 0; i < this.taskDrawers.length; i++) {
            this.taskDrawers[i].update(this.timeLineLayer);
        }
        setTimeout(() => {
            for(var i = 0; i < this.depDrawers.length; i++) {
                this.depDrawers[i].drawArrow(this.arrowGroup);
            }
            this.timeLineLayer.add(this.arrowGroup)
        }, 300);

    }

    generateTaskDrawers() {
        this.taskDrawers = [];
        TaskDrawerFactory.reset();
        for (var i:number = 0; i < this.project.tasks.length; i++) {
            this.taskDrawers.push(TaskDrawerFactory.getTaskDrawer(this.project.tasks[i]));
        }
    }


    private handleAddDates() {
        var that = this;
        $("#addBefore").click(function () {
            var centerDate = that.getCenterDate();
            Utils.startDate.setDate(Utils.startDate.getDate() - 7);
            that.draw();
            that.centerDate(centerDate);
        });
        $("#addAfter").click(function () {
            var centerDate = that.getCenterDate();
            Utils.finishDate.setDate(Utils.finishDate.getDate() + 7);
            that.draw();
            that.centerDate(centerDate);
        });
    }

    public changeZoom(zoomLevel:number):void {
        var centerDate = this.getCenterDate();
        Utils.dayWidth = zoomLevel;
        var visibleDays = $('#timeLineWrapper').width() / Utils.dayWidth;
        var diff = this.dateToDays(Utils.finishDate) - this.dateToDays(Utils.startDate) - visibleDays;
        if(diff < 0) {
            Utils.startDate = this.addDays(Utils.startDate, (diff / 2) - 1);
            Utils.finishDate = this.addDays(Utils.finishDate, (-diff / 2) + 1);
        } else if(diff > 30) {
            var newStartDate =  this.addDays(Utils.startDate,  (diff / 2));
            if(newStartDate.getTime() > this.project.start.getTime()) {
                Utils.startDate = new Date(this.project.start.getTime())
            } else {
                Utils.startDate = newStartDate;
            }
            var newEndDate =  this.addDays(Utils.finishDate, -(diff / 2));
            if(newEndDate.getTime() < this.project.finish.getTime()) {
                Utils.finishDate = new Date(this.project.finish.getTime())
            } else {
                Utils.finishDate = newEndDate;
            }

        }
        this.draw();
        this.centerDate(centerDate);
    }

    private centerDate(date: Date):void {
        var div = $("#timeLineWrapper");
        div.scrollLeft(Utils.dateToPosition(date) - div.width() / 2.0);
    }

    private scrollToDate(date: Date): void {
        $("#timeLineWrapper").scrollLeft(Utils.dateToPosition(date));
    }

    private getCenterDate():Date {
        var div = $("#timeLineWrapper");
        return Utils.positionToDate(div.scrollLeft() + div.width() / 2.0);
    }

    private dateToDays(date: Date) : number {
        return date.getTime() / 1000 / 60 / 60 / 24;
    }

    private addDays(date: Date, days: number) {
        var result = new Date(date.getTime());
        result.setDate(result.getDate() + days);
        return result;
    }

}
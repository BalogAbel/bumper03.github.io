import {Project} from "../Model/Project";
import {TaskDrawer} from "./TaskDrawer";
import {Utils} from "./Utils";
import {TimeLineDrawer} from "./TimeLineDrawer";
import {TaskDrawerFactory} from "./TaskDrawerFactory";
export class ProjectDrawer {
    private project:Project;
    private taskDrawers:TaskDrawer[];
    private static _instance:ProjectDrawer = null;
    private taskLayer:Konva.Layer;
    private timeLineLayer:Konva.Layer;

    constructor(project:Project) {
        ProjectDrawer._instance = this;
        this.project = project;

        Utils.startDate = new Date(project.start.getTime());
        Utils.startDate.setDate(Utils.startDate.getDate() - 7);

        Utils.finishDate = new Date(project.finish.getTime());
        Utils.finishDate.setDate(Utils.finishDate.getDate() + 7);

        //$("#timeLineWrapper").animate({
        //    scrollLeft: 7 * Utils.dayWidth
        //}, 1);

        this.handleScroll();
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

        taskStage.add(this.taskLayer);
        taskStage.height(TaskDrawer.actualPosition.y);

        var timeLineStage = new Konva.Stage({
            container: 'timeLine',
            width: Utils.getCanvasWidth(),
            height: 100
        });
        var timelineDrawer = new TimeLineDrawer();
        timelineDrawer.draw(this.timeLineLayer);

        timeLineStage.add(this.timeLineLayer);
        timeLineStage.height(Utils.getCanvasHeight());
    }

    static refresh() {
        if (ProjectDrawer._instance != null) {
            ProjectDrawer._instance.update();
        }
    }

    update():void {
        this.project.schedule();
        for (var i = 0; i < this.taskDrawers.length; i++) {
            this.taskDrawers[i].update(this.timeLineLayer);
        }
        //ProjectDrawer._instance.draw();
    }

    generateTaskDrawers() {
        this.taskDrawers = [];
        for (var i:number = 0; i < this.project.tasks.length; i++) {
            this.taskDrawers.push(TaskDrawerFactory.getTaskDrawer(this.project.tasks[i]));
        }
    }

    private handleScroll() {
        var that = this;
    }

    private getCenterDate() {

    }

    private handleAddDates() {
        var that = this;
        $("#addBefore").click(function () {
            Utils.startDate.setDate(Utils.startDate.getDate() - 7);
            that.draw();
        });
        $("#addAfter").click(function () {
            Utils.finishDate.setDate(Utils.finishDate.getDate() + 7);
            that.draw();
        });
    }

    public changeZoom(zoomLevel:number):void {
        Utils.dayWidth = zoomLevel;
        this.draw();
    }
}
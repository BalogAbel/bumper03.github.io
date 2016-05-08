import {ResourcesController} from "./components/resources/ResourcesController";
import {TaskVO} from "./components/taskDetail/TaskVO";
import {TaskDetailController} from "./components/taskDetail/TaskDetailController";
import {Schedulable} from "./Model/Schedulable";
import {Task} from "./Model/Task";
import {Summary} from "./Model/Summary";
import {ProjectService} from "../components/ProjectService";
import {ProjectDrawer} from "./View/ProjectDrawer";
import {Project} from "./Model/Project";
import {Utils} from "./View/Utils";
import {EditCalendarController} from "./components/EditCalendar/EditCalendarController";
import {ProjectGenerator} from "./Util/ProjectGenerator";
export class GanttCtrl {

    zoomLevel:number;
    project:Project;
    private projectDrawer:ProjectDrawer;

    constructor(private ProjectService:ProjectService,
                private $mdDialog:ng.material.IDialogService, private $mdToast:ng.material.IToastService) {

        this.project = ProjectService.get();
        this.project.schedule();
        this.projectDrawer = new ProjectDrawer(this.project);
        this.projectDrawer.draw();

        this.zoomLevel = Utils.dayWidth;

        //$("#taskWrapper").resize(function() {
        //    var margin: number = 66 + $(this).width();
        //    $("#arrows").css("margin-left", margin+"px");
        //    $("#zoom").css("margin-left", margin+"px");
        //});
    }

    public saveToGDrive():void {
        this.ProjectService.saveToGoogleDrive();
    }

    public saveLocally():void {
        this.ProjectService.saveToLocal();
    }


    public handleZoom():void {
        this.projectDrawer.changeZoom(this.zoomLevel);
    }

    public newTask():void {
        var that = this;
        this.$mdDialog.show({
            controller: TaskDetailController,
            controllerAs: "taskDetailController",
            templateUrl: 'gantt/components/taskDetail/taskDetail.html',
            locals: {
                project: this.project,
                task: new TaskVO()
            }
        }).then(function (taskVO:TaskVO) {
            if (taskVO == null) return;
            var task:Task = taskVO.isSummary ? new Summary() : new Schedulable();
            task.id = ProjectGenerator.idCtr++;
            taskVO.merge(task);
            if (task.parent == null) {
                that.project.tasks.push(task);
            }
            that.project.schedule();
            that.projectDrawer.draw();
            that.ProjectService.set(that.project);

        });
    }

    public editTask(task:Task):void {
        var that = this;
        this.$mdDialog.show({
            controller: TaskDetailController,
            controllerAs: "taskDetailController",
            templateUrl: 'gantt/components/taskDetail/taskDetail.html',
            locals: {
                project: this.project,
                task: TaskVO.fromTask(task)
            }
        }).then(function (taskVO:TaskVO, toDelete=false) {
            if (taskVO == null) return;
            if(taskVO.toDelete) {
                if(task instanceof Summary) {
                    var summary = <Summary>task;
                    for(var i = 0; i < summary.tasks.length; i++) {
                        summary.tasks[i].parent = summary.parent;
                        if (summary.parent == null) that.project.tasks.push(summary.tasks[i]);
                    }
                }
                if(task.parent != null) task.parent.tasks.splice(task.parent.tasks.indexOf(task), 1);
                else that.project.tasks.splice(that.project.tasks.indexOf(task), 1);
                console.log(that.project);
                for(var i = 0; i < task.successors.length; i++) {
                    task.successors[i].task.removeFromDependency(task);
                }
            } else {
                if (taskVO.parent != task.parent) {
                    var parentIdx = task.parent == null ? -1 : task.parent.tasks.indexOf(task);
                    if (parentIdx != -1) task.parent.tasks.splice(parentIdx, 1);
                    else that.project.tasks.splice(that.project.tasks.indexOf(task), 1);
                    task.parent = taskVO.parent;
                    if (task.parent != null) {
                        task.parent.tasks.push(task);
                    } else {
                        that.project.tasks.push(task);
                    }
                }
                taskVO.merge(task);
            }
            that.project.schedule();
            that.projectDrawer.draw();
            that.ProjectService.set(that.project);
        });
    }

    public editResources():void {
        this.$mdDialog.show({
            controller: ResourcesController,
            controllerAs: "resourcesController",
            templateUrl: "gantt/components/resources/resources.html",
            locals: {
                resources: this.project.resourceTypes
            }
        }).then(() => {
            this.project.schedule();
            this.projectDrawer.draw();
            this.ProjectService.set(this.project);
        })
    }

    public editCalendar():void {
        this.$mdDialog.show({
            controller: EditCalendarController,
            controllerAs: "editCalendarCtrl",
            templateUrl: "gantt/components/EditCalendar/editCalendar.html",
            locals: {
                workingCalendar: this.project.workingCalendar
            }
        }).then(() => {
            this.project.schedule();
            this.projectDrawer.draw();
            this.ProjectService.set(this.project);
        })
    }

}
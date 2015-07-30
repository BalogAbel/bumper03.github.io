/// <reference path="../references.ts" />

module app {
    import ng = angular;
    import Project = Model.Project;
    import Summary = Model.Summary;
    import Schedulable = Model.Schedulable;
    import Task = Model.Task;
    import ProjectGenerator = Util.ProjectGenerator;
    import ProjectDrawer = View.ProjectDrawer;
    import Utils = View.Utils;
    import ProjectService = app.ProjectService;

    export class GanttCtrl {

        zoomLevel:number;
        private project:Project;
        private projectDrawer:ProjectDrawer;

        constructor(projectService:ProjectService,
                    $location:ng.ILocationService,
                    private $mdDialog:ng.material.IDialogService) {

            this.project = projectService.get();
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

        public handleZoom():void {
            console.log(this.zoomLevel);
            this.projectDrawer.changeZoom(this.zoomLevel);
        }

        public newTask(): void {
            var that = this;
            this.$mdDialog.show({
                controller: TaskDetailController,
                controllerAs: "taskDetailController",
                templateUrl: 'gantt/components/taskDetail/taskDetail.html',
                locals: {
                    project: this.project,
                    task: new TaskVO()
                }
            }).then(function(taskVO: TaskVO) {
                if(taskVO == null) return;
                var task: Task = taskVO.isSummary ? new Summary() : new Schedulable();
                taskVO.merge(task);
                if(task.parent == null) {
                    that.project.tasks.push(task);
                } else {
                    task.parent.tasks.push(task);
                }
                that.project.schedule();
                that.projectDrawer.draw();

            });
        }

        public editTask(task: Task): void {
            this.$mdDialog.show({
                controller: TaskDetailController,
                controllerAs: "taskDetailController",
                templateUrl: 'gantt/components/taskDetail/taskDetail.html',
                locals: {
                    project: this.project,
                    task: TaskVO.fromTask(task)
                }
            }).then(function(taskVO: TaskVO) {
                if(taskVO == null) return;

                if(taskVO.parent != task.parent) {
                    var parentIdx = task.parent == null ? -1 : task.parent.tasks.indexOf(task);
                    if(parentIdx != -1) task.parent.tasks.splice(parentIdx, 1);
                    task.parent = taskVO.parent;
                    if(task.parent != null) {
                        task.parent.tasks.push(task);
                    } else {
                        this.project.tasks.push(task);
                    }
                }
                taskVO.merge(task);
                this.project.schedule();
                this.projectDrawer.draw();
            });
        }

        public editResources(): void {
            this.$mdDialog.show({
                controller: ResourcesController,
                controllerAs: "resourcesController",
                templateUrl: "gantt/components/resources/resources.html",
                locals: {
                    resources: this.project.resourceTypes
                }
            });
        }
    }
}
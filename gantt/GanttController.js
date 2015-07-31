/// <reference path="../references.ts" />
var app;
(function (app) {
    var Summary = Model.Summary;
    var Schedulable = Model.Schedulable;
    var ProjectDrawer = View.ProjectDrawer;
    var Utils = View.Utils;
    var GanttCtrl = (function () {
        function GanttCtrl(projectService, $location, $mdDialog) {
            this.$mdDialog = $mdDialog;
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
        GanttCtrl.prototype.handleZoom = function () {
            console.log(this.zoomLevel);
            this.projectDrawer.changeZoom(this.zoomLevel);
        };
        GanttCtrl.prototype.newTask = function () {
            var that = this;
            this.$mdDialog.show({
                controller: app.TaskDetailController,
                controllerAs: "taskDetailController",
                templateUrl: 'gantt/components/taskDetail/taskDetail.html',
                locals: {
                    project: this.project,
                    task: new app.TaskVO()
                }
            }).then(function (taskVO) {
                if (taskVO == null)
                    return;
                var task = taskVO.isSummary ? new Summary() : new Schedulable();
                taskVO.merge(task);
                if (task.parent == null) {
                    that.project.tasks.push(task);
                }
                else {
                    task.parent.tasks.push(task);
                }
                that.project.schedule();
                that.projectDrawer.draw();
            });
        };
        GanttCtrl.prototype.editTask = function (task) {
            this.$mdDialog.show({
                controller: app.TaskDetailController,
                controllerAs: "taskDetailController",
                templateUrl: 'gantt/components/taskDetail/taskDetail.html',
                locals: {
                    project: this.project,
                    task: app.TaskVO.fromTask(task)
                }
            }).then(function (taskVO) {
                if (taskVO == null)
                    return;
                if (taskVO.parent != task.parent) {
                    var parentIdx = task.parent == null ? -1 : task.parent.tasks.indexOf(task);
                    if (parentIdx != -1)
                        task.parent.tasks.splice(parentIdx, 1);
                    task.parent = taskVO.parent;
                    if (task.parent != null) {
                        task.parent.tasks.push(task);
                    }
                    else {
                        this.project.tasks.push(task);
                    }
                }
                taskVO.merge(task);
                this.project.schedule();
                this.projectDrawer.draw();
            });
        };
        GanttCtrl.prototype.editResources = function () {
            var _this = this;
            this.$mdDialog.show({
                controller: app.ResourcesController,
                controllerAs: "resourcesController",
                templateUrl: "gantt/components/resources/resources.html",
                locals: {
                    resources: this.project.resourceTypes
                }
            }).then(function () {
                _this.project.schedule();
                _this.projectDrawer.draw();
            });
        };
        return GanttCtrl;
    })();
    app.GanttCtrl = GanttCtrl;
})(app || (app = {}));
//# sourceMappingURL=GanttController.js.map
var ResourcesController_1 = require("./components/resources/ResourcesController");
var TaskVO_1 = require("./components/taskDetail/TaskVO");
var TaskDetailController_1 = require("./components/taskDetail/TaskDetailController");
var Schedulable_1 = require("./Model/Schedulable");
var Summary_1 = require("./Model/Summary");
var ProjectDrawer_1 = require("./View/ProjectDrawer");
var Utils_1 = require("./View/Utils");
var GanttCtrl = (function () {
    function GanttCtrl(ProjectService, $mdDialog) {
        this.$mdDialog = $mdDialog;
        console.log(this);
        this.project = ProjectService.get();
        this.project.schedule();
        this.projectDrawer = new ProjectDrawer_1.ProjectDrawer(this.project);
        this.projectDrawer.draw();
        this.zoomLevel = Utils_1.Utils.dayWidth;
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
            controller: TaskDetailController_1.TaskDetailController,
            controllerAs: "taskDetailController",
            templateUrl: 'gantt/components/taskDetail/taskDetail.html',
            locals: {
                project: this.project,
                task: new TaskVO_1.TaskVO()
            }
        }).then(function (taskVO) {
            if (taskVO == null)
                return;
            var task = taskVO.isSummary ? new Summary_1.Summary() : new Schedulable_1.Schedulable();
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
            controller: TaskDetailController_1.TaskDetailController,
            controllerAs: "taskDetailController",
            templateUrl: 'gantt/components/taskDetail/taskDetail.html',
            locals: {
                project: this.project,
                task: TaskVO_1.TaskVO.fromTask(task)
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
            controller: ResourcesController_1.ResourcesController,
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
exports.GanttCtrl = GanttCtrl;
//# sourceMappingURL=GanttController.js.map
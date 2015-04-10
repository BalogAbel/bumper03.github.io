/// <reference path="../references.ts" />
var app;
(function (app) {
    var ProjectDrawer = View.ProjectDrawer;
    var Utils = View.Utils;
    var GanttCtrl = (function () {
        function GanttCtrl(projectService, $location) {
            this.project = projectService.get();
            this.project.schedule();
            this.projectDrawer = new ProjectDrawer(this.project);
            this.projectDrawer.draw();
            this.zoomLevel = Utils.dayWidth;
            $("#taskWrapper").resize(function () {
                var margin = 66 + $(this).width();
                $("#arrows").css("margin-left", margin + "px");
                $("#zoom").css("margin-left", margin + "px");
            });
        }
        GanttCtrl.prototype.handleZoom = function () {
            console.log(this.zoomLevel);
            this.projectDrawer.changeZoom(this.zoomLevel);
        };
        GanttCtrl.prototype.newSchedulable = function () {
            alert("New Schedulable");
            //var modalInstance = this.modalService.open({
            //    templateUrl: 'gantt/components/taskDetail/taskDetail.html',
            //    controller: app.TaskDetailController,
            //    controllerAs: 'taskDetail',
            //    size: 'lg',
            //    resolve: {
            //        task: function (): Task {
            //            var schedulable = new Schedulable();
            //            schedulable.name = "name"
            //            return schedulable;
            //        }
            //    }
            //});
        };
        return GanttCtrl;
    })();
    app.GanttCtrl = GanttCtrl;
})(app || (app = {}));
//# sourceMappingURL=GanttController.js.map
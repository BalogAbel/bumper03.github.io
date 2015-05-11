/// <reference path="../references.ts" />
var app;
(function (app) {
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
        GanttCtrl.prototype.newSchedulable = function () {
            this.$mdDialog.show({
                controller: app.TaskDetailController,
                controllerAs: "taskDetailController",
                templateUrl: 'gantt/components/taskDetail/taskDetail.html',
                locals: {
                    project: this.project
                }
            });
        };
        return GanttCtrl;
    })();
    app.GanttCtrl = GanttCtrl;
})(app || (app = {}));
//# sourceMappingURL=GanttController.js.map
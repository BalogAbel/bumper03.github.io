/// <reference path="../references.ts" />
var app;
(function (app) {
    var Schedulable = Model.Schedulable;
    var ProjectDrawer = View.ProjectDrawer;
    var Utils = View.Utils;
    var GanttCtrl = (function () {
        function GanttCtrl(projectService, $location, $modal) {
            this.modalService = $modal;
            var project = projectService.get();
            project.schedule();
            var projectDrawer = new ProjectDrawer(project);
            projectDrawer.draw();
            $("#taskWrapper").resize(function () {
                var margin = 66 + $(this).width();
                $("#arrows").css("margin-left", margin + "px");
                $("#zoom").css("margin-left", margin + "px");
            });
            $("#zoomValue").text(Utils.dayWidth);
            $("#slider").slider({
                value: Utils.dayWidth,
                min: 10,
                max: 500,
                slide: function (event, ui) {
                    $("#zoomValue").text(ui.value);
                }
            });
        }
        GanttCtrl.prototype.newSchedulable = function () {
            var modalInstance = this.modalService.open({
                templateUrl: 'gantt/components/taskDetail/taskDetail.html',
                controller: app.TaskDetailController,
                controllerAs: 'taskDetail',
                size: 'lg',
                resolve: {
                    task: function () {
                        var schedulable = new Schedulable();
                        schedulable.name = "name";
                        return schedulable;
                    }
                }
            });
        };
        return GanttCtrl;
    })();
    app.GanttCtrl = GanttCtrl;
})(app || (app = {}));
//# sourceMappingURL=GanttController.js.map
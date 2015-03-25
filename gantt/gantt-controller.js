/// <reference path="../references.ts" />
var app;
(function (app) {
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
        GanttCtrl.prototype.newTask = function () {
            var modalInstance = this.modalService.open({
                templateUrl: 'gantt/templates/newTask.html',
                size: 'lg',
                resolve: {}
            });
        };
        return GanttCtrl;
    })();
    app.GanttCtrl = GanttCtrl;
})(app || (app = {}));
//# sourceMappingURL=gantt-controller.js.map
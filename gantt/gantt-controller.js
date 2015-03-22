/// <reference path="../references.ts" />
var app;
(function (app) {
    var ProjectDrawer = View.ProjectDrawer;
    var Utils = View.Utils;
    var GanttCtrl = (function () {
        function GanttCtrl(projectService, $location) {
            var project = projectService.get();
            console.log(project);
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
        return GanttCtrl;
    })();
    app.GanttCtrl = GanttCtrl;
})(app || (app = {}));
//# sourceMappingURL=gantt-controller.js.map
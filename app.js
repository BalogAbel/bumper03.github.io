///<reference path='app/Util/ProjectGenerator.ts'/>
///<reference path='app/Model/Project.ts'/>
///<reference path='lib/jquery.d.ts'/>
///<reference path='app/View/ProjectDrawer.ts'/>
///<reference path='app/View/Utils.ts'/>
var app;
(function (app) {
    var ProjectGenerator = Util.ProjectGenerator;
    var ProjectDrawer = View.ProjectDrawer;
    var Utils = View.Utils;

    //entry point of the app
    $(function () {
        var project = (new ProjectGenerator()).generateProject();
        project.schedule();
        console.log(project);
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
    });
})(app || (app = {}));
//# sourceMappingURL=app.js.map

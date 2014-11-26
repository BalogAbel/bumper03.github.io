///<reference path='app/Util/ProjectGenerator.ts'/>
///<reference path='app/Model/Project.ts'/>
///<reference path='lib/jquery.d.ts'/>
///<reference path='app/View/ProjectDrawer.ts'/>
var app;
(function (app) {
    var ProjectGenerator = Util.ProjectGenerator;
    var ProjectDrawer = View.ProjectDrawer;

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
        });
    });
})(app || (app = {}));
//# sourceMappingURL=app.js.map

/// <reference path="../../references.ts" />

module app {

    import Project = Model.Project;
    import ProjectGenerator = Util.ProjectGenerator;
    import ProjectDrawer = View.ProjectDrawer;
    import Utils = View.Utils;

    export class GanttCtrl {


        constructor(localStorageService: ng.local.storage.ILocalStorageService<string>, $location: ng.ILocationService) {
            var project = Project.fromJSON(localStorageService.get("project"));

            console.log(project);

            project.schedule();
            var projectDrawer: ProjectDrawer = new ProjectDrawer(project);
            projectDrawer.draw();

            $("#taskWrapper").resize(function() {
                var margin: number = 66 + $(this).width();
                $("#arrows").css("margin-left", margin+"px");
                $("#zoom").css("margin-left", margin+"px");
            });
            $("#zoomValue").text(Utils.dayWidth);
            $("#slider").slider({
                value: Utils.dayWidth,
                min: 10,
                max: 500,
                slide: function(event, ui) {
                    $("#zoomValue").text(ui.value);
                }
            });


        }
    }
}
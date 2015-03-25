/// <reference path="../references.ts" />

module app {

    import Project = Model.Project;
    import ProjectGenerator = Util.ProjectGenerator;
    import ProjectDrawer = View.ProjectDrawer;
    import Utils = View.Utils;
    import ProjectService = app.ProjectService;

    import ng = angular;

    export class GanttCtrl {

        modalService: ng.ui.bootstrap.IModalService;

        constructor(projectService: ProjectService, $location: ng.ILocationService, $modal: ng.ui.bootstrap.IModalService) {
            this.modalService = $modal;

            var project = projectService.get();


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

        public newTask() {

            var modalInstance = this.modalService.open({
                templateUrl: 'gantt/templates/newTask.html',
                size: 'lg',
                resolve: {
                    //items: function () {
                    //    return $scope.items;
                    //}
                }
            });

        }
    }
}
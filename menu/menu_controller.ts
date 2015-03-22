/// <reference path="../references.ts" />
module app {
    import Project = Model.Project;
    import ProjectService = app.ProjectService;

    'use strict';


    export class MenuCtrl {

        private location: ng.ILocationService;
        private projectService: ProjectService

        constructor($location: ng.ILocationService, projectService: ProjectService) {
            this.location = $location;
            this.projectService = projectService;
        }

        openFromGoogleDriver(): void{
            alert('Google drive');
        }
        openFromLocal(): void{
            alert('Local');
        }

        new(): void {
            //var project: Project = new Project();
            var project = new Util.ProjectGenerator().generateProject();
            this.showProject(project);
        }

        private showProject(project: Project): void {
            this.projectService.set(project);
            this.location.path("/gantt");
        }




    }
}
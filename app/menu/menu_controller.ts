/// <reference path="../../references.ts" />
module app {
    import Project = Model.Project;

    'use strict';


    export class MenuCtrl {

        private storage: ng.local.storage.ILocalStorageService<string>;
        private location: ng.ILocationService;

        constructor(localStorageService: ng.local.storage.ILocalStorageService<string>, $location: ng.ILocationService) {
            this.storage = localStorageService;
            this.location = $location;
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
            var projectStr = project.toJSON();
            console.log(projectStr);
            this.storage.set("project", projectStr);
            this.location.path("/gantt");
        }




    }
}
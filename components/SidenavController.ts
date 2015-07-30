/**
 * Created by Balog Ábel Péter on 2015.04.08..
 */

///<reference path='../references.ts' />

module app {
    import ng = angular;
    import Project = Model.Project;


    export class SidenavController {

        constructor(private $location:ng.ILocationService,
                    private projectService:ProjectService) {
        }

        openFromGoogleDriver(): void{
            alert('Google drive');
        }
        openFromLocal(): void{
            alert('Local');
        }

        new(): void {
            //var project: Project = new Project();
            var project = Util.ProjectGenerator.generateProject();
            this.showProject(project);
        }

        private showProject(project: Project): void {
            this.projectService.set(project);
            this.$location.path("/gantt");
        }

    }
}
import {ProjectGenerator} from "../gantt/Util/ProjectGenerator";
import {Project} from "../gantt/Model/Project";
import {ProjectService} from "../components/ProjectService";

export class WelcomeController {
    open = false;

    constructor(private $location:ng.ILocationService,
                private ProjectService:ProjectService) {

    }

    newEmpty(): void {
        var project = new Project();
        this.showProject(project);
    }

    newExample(): void {
        var project = ProjectGenerator.generateProject();
        this.showProject(project);
    }

    openFromGoogleDrive(): void {
        console.log(this);
        this.ProjectService.loadFromGDrive().then(
            (project: Project) => {
                this.showProject(project);
            }
        );
    }

    private showProject(project:Project):void {
        this.ProjectService.set(project);
        this.$location.path("/gantt");
    }
}
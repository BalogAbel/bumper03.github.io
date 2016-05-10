import {ProjectGenerator} from "../gantt/Util/ProjectGenerator";
import {Project} from "../gantt/Model/Project";
import {ProjectService} from "../components/ProjectService";
import {WorkingCalendar} from "../gantt/Model/WorkingCalendar/WorkingCalendar";

export class WelcomeController {
    open = false;

    constructor(private $location:ng.ILocationService,
                private ProjectService:ProjectService) {
        WorkingCalendar.reset();

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

    public upload(files: File[]):void {
        var reader = new FileReader();
        reader.onload = (e: any) => {
            var projectObj = JSON.parse(e.srcElement.result);
            var project = new Project();
            if (projectObj != null) {
                project.deserialize(projectObj);
                JSON.retrocycle(project);
                this.showProject(project);
            }
            console.log(project);
        };
        reader.readAsText(files[0])
    }

    private showProject(project:Project):void {
        this.ProjectService.set(project);
        this.$location.path("/gantt");
    }
}
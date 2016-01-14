import {ProjectService} from "./ProjectService";
import {Project} from "../gantt/Model/Project";
import {ProjectGenerator} from "../gantt/Util/ProjectGenerator";

export class SidenavController {

    constructor(private $location:ng.ILocationService,
                private projectService:ProjectService) {
    }

    openFromGoogleDriver():void {
        alert('Google drive');
    }

    openFromLocal():void {
        alert('Local');
    }

    new():void {
        //var project: Project = new Project();
        var project = ProjectGenerator.generateProject();
        this.showProject(project);
    }

    private showProject(project:Project):void {
        this.projectService.set(project);
        this.$location.path("/gantt");
    }

}
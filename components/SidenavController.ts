import {ProjectService} from "./ProjectService";
import {Project} from "../gantt/Model/Project";
import {ProjectGenerator} from "../gantt/Util/ProjectGenerator";

export class SidenavController {

    toggles:string[] = [];

    constructor(private $location:ng.ILocationService,
                private projectService:ProjectService) {
    }

    openFromGoogleDrive():void {
        this.projectService.loadFromGDrive();
    }

    openFromLocal():void {
        alert('Local');
    }

    saveToGoogleDrive():void {
        this.projectService.saveToGoogleDrive();
    }

    saveToLocal():void {
        this.projectService.saveToLocal();
    }

    new():void {
        console.log('new');
        //var project: Project = new Project();
        var project = ProjectGenerator.generateProject();
        console.log(project);
        this.showProject(project);
    }

    toggleMenu(menu:string) {
        var index = this.toggles.indexOf(menu);
        if (index > -1) this.toggles.splice(index, 1);
        else this.toggles.push(menu);
    }

    isMenuOpen(menu:string) {
        return this.toggles.indexOf(menu) > -1;
    }

    private showProject(project:Project):void {
        this.projectService.set(project);
        this.$location.path("/gantt");
    }

}
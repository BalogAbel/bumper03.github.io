import {Project} from "../gantt/Model/Project";
import {GDriveService, ProjectFile} from "./GDriveService";
import {SelectItemController} from "./SelectItemDialog/SelectItemController";
import IPromise = angular.IPromise;

export class ProjectService {
    project:Project = null;


    constructor(private gDriveService:GDriveService, private $mdDialog:angular.material.IDialogService,
                private $window: angular.IWindowService) {
    }

    get():Project {
        if (this.project == null) {
            var projectObj = JSON.parse(localStorage.getItem("project"));
            this.project = new Project();
            if (projectObj != null) {
                this.project.deserialize(projectObj);
                JSON.retrocycle(this.project);
            }
        }
        return this.project;
    }

    set(project:Project):void {
        localStorage.setItem("project", JSON.stringify(JSON.decycle(project)));
        this.project = project;
    }

    loadFromGDrive(): IPromise<Project> {
        return this.gDriveService.list().then((files) => {
            return this.$mdDialog.show({
                controller: SelectItemController,
                controllerAs: "selectItemCtrl",
                templateUrl: 'components/SelectItemDialog/SelectItem.html',
                locals: {
                    title: 'project',
                    items: files
                }
            })
        }).then((item:ProjectFile) => {
            return this.gDriveService.open(item.downloadUrl);
        });
    }

    saveToGoogleDrive():void {
        this.gDriveService.save(this.project);
    }

    saveToLocal():void {
        var data = new Blob([JSON.stringify(JSON.decycle(this.project))], {type: 'application/json'});
        var fileName = this.project.name + ".gnt";

        var e = document.createEvent('MouseEvents');
        var a:any = document.createElement('a');
        a.download = fileName;
        a.href = this.$window.URL.createObjectURL(data);
        a.dataset.downloadUrl = ['application/json', a.download, a.href]
        e.initMouseEvent('click', true, false, this.$window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);

    }

}
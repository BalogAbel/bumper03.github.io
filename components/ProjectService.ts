/**
 * Created by Abel on 2015.03.22..
 */

///<reference path='../references.ts' />

module app {
    import Project = Model.Project;
    export class ProjectService {
        project:Project = null;

        constructor(private localStorageService:ng.local.storage.ILocalStorageService<string>) {
         }

        get(): Project {
            if (this.project == null) {
                var projectObj = JSON.parse(localStorage.getItem("project"));
                this.project = new Project();
                if(projectObj != null ) {
                    this.project.deserialize(projectObj);
                    JSON.retrocycle(this.project);
                }
                console.log(this.project)
            }
            return this.project;
        }

        set(project:Project): void  {
            localStorage.setItem("project", JSON.stringify(JSON.decycle(project)));
            //console.log(localStorage.getItem("project"));
            this.project = project;
        }


    }
}
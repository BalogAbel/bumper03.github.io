import {Project} from "../gantt/Model/Project";

export class ProjectService {
    project:Project = null;

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


}
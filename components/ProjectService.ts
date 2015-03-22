/**
 * Created by Abel on 2015.03.22..
 */

///<reference path='../references.ts' />

module app {
    import Project = Model.Project;
    export class ProjectService {
        project: Project = null;

        get(): Project {
            if (this.project == null) {
                this.project = new Project();
            }
            return this.project;
        }

        set(project: Project): void {
            this.project = project;
        }


    }
}
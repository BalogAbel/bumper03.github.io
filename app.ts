///<reference path='app/Util/ProjectGenerator.ts'/>
///<reference path='app/Model/Project.ts'/>
///<reference path='lib/jquery.d.ts'/>
///<reference path='app/View/ProjectDrawer.ts'/>
module app {
    import Project = Model.Project;
    import ProjectGenerator = Util.ProjectGenerator;
    import ProjectDrawer = View.ProjectDrawer;



    //entry point of the app
    $(() => {

            var project:Project = (new ProjectGenerator()).generateProject();
            project.schedule();
            console.log(project);
            var projectDrawer: ProjectDrawer = new ProjectDrawer();
            projectDrawer.project = project;
            projectDrawer.draw();


        }
    )


}
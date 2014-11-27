///<reference path='app/Util/ProjectGenerator.ts'/>
///<reference path='app/Model/Project.ts'/>
///<reference path='lib/jquery.d.ts'/>
///<reference path='app/View/ProjectDrawer.ts'/>
///<reference path='app/View/Utils.ts'/>
module app {
    import Project = Model.Project;
    import ProjectGenerator = Util.ProjectGenerator;
	import ProjectDrawer = View.ProjectDrawer;
	import Utils = View.Utils;



    //entry point of the app
    $(() => {

            var project:Project = (new ProjectGenerator()).generateProject();
            project.schedule();
            console.log(project);
            var projectDrawer: ProjectDrawer = new ProjectDrawer(project);
            projectDrawer.draw();

			$("#taskWrapper").resize(function() {
				var margin: number = 66 + $(this).width();
				$("#arrows").css("margin-left", margin+"px");
				$("#zoom").css("margin-left", margin+"px");
			});
			$("#zoomValue").text(Utils.dayWidth);
			$("#slider").slider({
				value: Utils.dayWidth,
				min: 10,
				max: 500,
				slide: function(event, ui) {
					$("#zoomValue").text(ui.value);
				}
			});


        }
    )


}
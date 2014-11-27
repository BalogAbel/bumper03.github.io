///<reference path='../../lib/kineticjs.d.ts'/>
///<reference path='../../lib/jquery.d.ts'/>
///<reference path='../../lib/jqueryui.d.ts'/>
///<reference path='../Model/Project.ts'/>
///<reference path='TaskDrawer.ts'/>
///<reference path='TaskDrawerFactory.ts'/>
///<reference path='TimeLineDrawer.ts'/>
///<reference path='Utils.ts'/>

module View {
	import Project = Model.Project;
	import TaskDrawer = View.TaskDrawer;
	import TaskDrawerFactory = View.TaskDrawerFactory;
	import TimeLineDrawer = View.TimeLineDrawer;
	import Utils = View.Utils;

	export class ProjectDrawer {
		project: Project;
		taskDrawers: TaskDrawer[];
		private static _instance: ProjectDrawer = null;

		constructor(project: Project) {
			ProjectDrawer._instance = this;
			this.project = project;

			Utils.startDate = new Date(project.start.getTime());
			Utils.startDate.setDate(Utils.startDate.getDate() - 7);

			Utils.finishDate = new Date(project.finish.getTime());
			Utils.finishDate.setDate(Utils.finishDate.getDate() + 7);

			$("#timeLineWrapper").animate({
				scrollLeft: 7 * Utils.dayWidth}, 1);

			this.handleScroll();
			this.handleAddDates();
			this.handleZoom();

		}

		draw() {
			this.generateTaskDrawers();
			var taskStage = new Kinetic.Stage({
				container: 'tasks',
				width: 400,
				height: 100
			});
			taskStage.clear();
			TaskDrawer.actualPosition = {x: 0, y: Utils.taskLineHeight*1.5};

			var taskLayer = new Kinetic.Layer();
			var timeLineLayer = new Kinetic.Layer();
			for(var i: number = 0; i < this.taskDrawers.length; i++) {
				this.taskDrawers[i].draw(taskLayer, timeLineLayer);
			}

			taskStage.add(taskLayer);
			taskStage.height(TaskDrawer.actualPosition.y);

			var timeLineStage = new Kinetic.Stage({
				container: 'timeLine',
				width: Utils.getCanvasWidth(),
				height: 100
			});
			var timelineDrawer: TimeLineDrawer = new TimeLineDrawer();
			timelineDrawer.draw(timeLineLayer);

			timeLineStage.add(timeLineLayer);
			timeLineStage.height(Utils.getCanvasHeight());
		}

		static refresh() {
			if(ProjectDrawer._instance != null) {
				ProjectDrawer._instance.project.schedule();
				ProjectDrawer._instance.draw();
			}
		}

		generateTaskDrawers() {
			this.taskDrawers = [];
			for(var i: number = 0; i < this.project.tasks.length; i++) {
				this.taskDrawers.push(TaskDrawerFactory.getTaskDrawer(this.project.tasks[i]));
			}
		}

		private handleScroll() {
			var that = this;
		}

		private getCenterDate() {

		}

		private handleAddDates() {
			var that = this;
			$("#addBefore").click(function() {
				Utils.startDate.setDate(Utils.startDate.getDate() - 7 );
				that.draw();
			});
			$("#addAfter").click(function() {
				Utils.finishDate.setDate(Utils.finishDate.getDate() + 7 );
				that.draw();
			});
		}

		private handleZoom() {
			var that = this;
			$("#slider").on("slidechange", function(evt: JQueryEventObject, ui) {
				Utils.dayWidth = ui.value;
				that.draw();
			})
		}

	}
}
///<reference path='../../lib/kineticjs.d.ts'/>
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

		constructor() {
			ProjectDrawer._instance = this;
		}

		draw() {
			this.generateTaskDrawers();
;
			var taskStage = new Kinetic.Stage({
				container: 'tasks',
				width: 400,
				height: 100
			});
			taskStage.clear();
			TaskDrawer.actualPosition = {x: 0, y: Utils.taskLineHeight};

			Utils.startDate = this.project.start;

			var taskLayer = new Kinetic.Layer();
			var timeLineLayer = new Kinetic.Layer()
			for(var i: number = 0; i < this.taskDrawers.length; i++) {
				this.taskDrawers[i].draw(taskLayer, timeLineLayer);
			}

			taskStage.add(taskLayer);
			taskStage.height(TaskDrawer.actualPosition.y);


			var timeLineStage = new Kinetic.Stage({
				container: 'timeLine',
				width: 3000,
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


		static
		test(stage: Kinetic.IStage) {
			var layer = new Kinetic.Layer();


			var rect = new Kinetic.Rect({
				cornerRadius: 10,
				x: 0,
				y: 0,
				width: 100,
				height: 50,
				fill: 'green',
				stroke: 'black',
				strokeWidth: 1
			});

			var group = new Kinetic.Group({
				x: 200,
				y: 150,
				draggable: true,
				dragBoundFunc: function(pos: Kinetic.Vector2d) {
					var y: number = this.getAbsolutePosition().y;
					return {
						x: pos.x,
						y: y
					};
				}
			});

			var taskName = new Kinetic.Text({
				name: 'TaskName',
				text: 'Sample task name',
			});

			group.add(rect);
			group.add(taskName);
			layer.add(group);
			stage.add(layer);
		}
	}
}
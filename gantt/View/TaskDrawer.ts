///<reference path='../../references.ts'/>

module View {
	import Task = Model.Task;
	import Utils = View.Utils;
	import PojectDrawer = View.ProjectDrawer;

	export class TaskDrawer {
		task: Task;
		private static taskNameSample: Kinetic.IGroup;
		private static taskTimeLineSample: Kinetic.IGroup;
		static actualPosition: Kinetic.Vector2d;

		draw(layer: Kinetic.ILayer, timeLineLayer: Kinetic.ILayer) {
			if(TaskDrawer.taskNameSample == null || TaskDrawer.taskTimeLineSample == null)
				this.createSamples();

			var node: Kinetic.IGroup = <Kinetic.IGroup>TaskDrawer.taskNameSample.clone({});

			var taskName = <Kinetic.IText>node.find('.TaskName')[0];
			taskName.name('TaskName' + this.task.id);
			taskName.setText(this.task.name);

			node.setPosition(TaskDrawer.actualPosition);
			layer.add(node);

			var line: Kinetic.IGroup = <Kinetic.IGroup>TaskDrawer.taskTimeLineSample.clone({});
			var taskLine = <Kinetic.ILine>line.find('.TaskLine')[0];
			taskLine.setPoints([
				0, 0,
				Utils.getCanvasWidth(), 0
			]);
			line.setPosition({x: 0, y: TaskDrawer.actualPosition.y});

			timeLineLayer.add(line);

			TaskDrawer.actualPosition.y += Utils.taskLineHeight;

		}

		createSamples() {
			this.createTaskNameSample();
			this.createTaskTimeLineSample();
		}


		createTaskNameSample() {
			TaskDrawer.taskNameSample = new Kinetic.Group({
				x: 0,
				y: 0
			});
			var taskName = new Kinetic.Text({
				name: 'TaskName',
				text: 'Sample task name',
				fontSize: Utils.taskLineHeight * 2 / 3,
				fontFamily: 'Calibri',
				fill: 'blue'
			});

			var line = new Kinetic.Line({
				name: 'TaskLine',
				stroke: 'grey',
				dash: [1, 1],
				x: 0,
				y: 0,
				points: [
					0, 0,
					Utils.getCanvasWidth(), 0
				]
			});

			TaskDrawer.taskNameSample.add(line);
			TaskDrawer.taskNameSample.add(taskName);

		}

		createTaskTimeLineSample() {
			TaskDrawer.taskTimeLineSample = new Kinetic.Group({
				x: 0,
				y: 0
			});
			var line = new Kinetic.Line({
				name: 'TaskLine',
				stroke: 'grey',
				dash: [1, 1],
				x: 0,
				y: 0,
				points: [
					0, 0,
					Utils.getCanvasWidth(), 0
				]
			});

			TaskDrawer.taskTimeLineSample.add(line);
		}

		dragged(evt: any) {
			var date: Date =  Utils.positionToDate(evt.target.getAbsolutePosition().x);
			this.task.earliestStartConstraint = new Date(date.getTime());
			ProjectDrawer.refresh();
		}
	}
}
///<reference path='../../references.ts'/>
///<reference path="Task.ts"/>

module Model {
	import Schedulable = Model.Schedulable;
	import HashSet = Util.HashSet;

	export class Summary extends Task implements Util.ISerializable<Summary>{

		tasks: Task[];

		constructor() {
			super();
			this.tasks = [];
		}

		getSubTasks(): HashSet<Schedulable> {
			var result: HashSet<Schedulable> = super.getSubTasks();
			for(var i: number = 0; i < this.tasks.length; i++) {
				result.putAll(this.tasks[i].getSubTasks());
			}
			return result;
		}

		notifyScheduled(task: Task) {
			if(this.finish == null || this.finish.getTime() < task.finish.getTime()) {
				this.finish = new Date(task.finish.getTime());
			}
			if(this.start == null || this.start.getTime() > task.start.getTime()) {
				this.start = new Date(task.start.getTime());
			}
			if(this.parent != null) {
				this.parent.notifyScheduled(this);
			}
		}

		deserialize(input: any): Summary {
			super.deserialize(input);
			if(input.tasks != null) {
				for (var i = 0; i < input.tasks.length; i++) {
					this.tasks.push(Task.deserializeHelper(input.tasks[i]));
				}
			}

			return this;
		}




	}
}
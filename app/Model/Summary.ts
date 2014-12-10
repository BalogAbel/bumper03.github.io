///<reference path='Task.ts'/>
///<reference path='../Util/HashSet.ts'/>
///<reference path='Schedulable.ts'/>

module Model {
	import Schedulable = Model.Schedulable;
	import HashSet = Util.HashSet;

	export class Summary extends Task {

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


	}
}
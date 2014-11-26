///<reference path='Dependency.ts'/>
///<reference path='Schedulable.ts'/>
///<reference path='../Util/Hashable.ts'/>
///<reference path='../Util/HashSet.ts'/>
///<reference path='Summary.ts'/>

module Model {
	import Dependency = Model.Dependency;
	import Schedulable = Model.Schedulable;
	import Summary = Model.Summary;
	import HashSet = Util.HashSet;
	import Hashable = Util.Hashable;

	//abstract class (no TS support for that :( ), do not instantiate!
	export class Task implements Hashable {

		id: number;

		name: string;
		description: string;
		successors: Task[];
		predecessors: Dependency[];
		parent: Summary;
		start: Date;
		finish: Date;
		earliestStartConstraint: Date;

		constructor() {
			this.predecessors = [];
			this.successors = [];
			this.parent = null;
			this.earliestStartConstraint = null;
		}

		reset() {
			this.start = null;
			this.finish = null;
		}

		getSubTasks(): HashSet<Schedulable> {
			return new HashSet<Schedulable>();
		}

		/**
		 * Returns the task's dependencies, not including transitive dependencies
		 * @returns {Dependency[]}
		 */
		getDependencies(): Dependency[] {
			var result: Dependency[] = [];
			var that = this;
			for(var i: number = 0; i < this.predecessors.length; i++) {
				var subTasks = this.predecessors[i].task.getSubTasks();
				subTasks.each(function(task: Schedulable): boolean {
					var dep: Dependency = new Model.Dependency();
					dep.task = task;
					dep.lag = that.predecessors[i].lag;
					result.push(dep);
					return true;
				});
			}
			if(this.parent != null) {
				var deps = this.parent.getDependencies();
				for(var i: number = 0; i < deps.length; i++) {
					result.push(deps[i]);
				}
			}
			return result;
		}

		getCriticalCost() {
			return null;
		}

		hash(): number {
			return this.id;
		}

		getEarliestStartConstraint(): Date {
			if(this.parent != null && this.earliestStartConstraint != null) {
				var parentDate: Date = this.parent.getEarliestStartConstraint();
				if(parentDate != null && parentDate.getTime() > this.earliestStartConstraint.getTime()) {
					return parentDate;
				}
			}
			return this.earliestStartConstraint;
		}
	}
}
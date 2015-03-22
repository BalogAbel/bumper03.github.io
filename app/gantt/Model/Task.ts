///<reference path='../../../references.ts'/>

module Model {
	import Dependency = Model.Dependency;
	import Schedulable = Model.Schedulable;
	import Summary = Model.Summary;
	import ResourceUsage = Model.Resources.ResourceUsage;
	import HashSet = Util.HashSet;
	import Hashable = Util.Hashable;

	//abstract class (no TS support for that :( ), do not instantiate!
	export class Task implements Hashable {

		id: number;

		name: string;
		description: string;
		successors: Dependency[];
		predecessors: Dependency[];
		parent: Summary;
		start: Date;
		finish: Date;
		earliestStartConstraint: Date;
		resourceUsages: ResourceUsage[];

		constructor() {
			this.predecessors = [];
			this.successors = [];
			this.parent = null;
			this.earliestStartConstraint = null;
			this.resourceUsages = [];
		}

		reset() {
			this.start = null;
			this.finish = null;
		}

		getSubTasks(): HashSet<Schedulable> {
			return new HashSet<Schedulable>();
		}

		/**
		 * Returns the task's predecessors, not including transitive predecessors
		 * @returns {Dependency[]}
		 */
		getPredecessors(): Dependency[] {
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
				var deps = this.parent.getPredecessors();
				for(var i: number = 0; i < deps.length; i++) {
					result.push(deps[i]);
				}
			}
			return result;
		}

		/**
		 * Returns the task's successors, not including transitive successors
		 * @returns {Dependency[]}
		 */
		getSuccessors(): Dependency[] {
			var result: Dependency[] = [];
			var that = this;
			for(var i: number = 0; i < this.successors.length; i++) {
				var subTasks = this.successors[i].task.getSubTasks();
				subTasks.each(function(task: Schedulable): boolean {
					var dep: Dependency = new Model.Dependency();
					dep.task = task;
					dep.lag = that.successors[i].lag;
					result.push(dep);
					return true;
				});
			}
			if(this.parent != null) {
				var deps = this.parent.getSuccessors();
				for(var i: number = 0; i < deps.length; i++) {
					result.push(deps[i]);
				}
			}
			return result;
		}

		hash(): number {
			return this.id;
		}

		getEarliestStartConstraint(): Date {
			if(this.parent != null) {
				var parentDate: Date = this.parent.getEarliestStartConstraint();
				if(this.earliestStartConstraint == null ||
					(parentDate != null && parentDate.getTime() > this.earliestStartConstraint.getTime())) {
					return parentDate;
				}
			}
			return this.earliestStartConstraint;
		}


		getResourceUsages(): ResourceUsage[] {
			var result = this.resourceUsages;
			if(this.parent != null) {
				result = result.concat(this.parent.getResourceUsages())
			}
			return result;
		}
	}
}
///<reference path='../../../references.ts'/>

module app {

    import Summary = Model.Summary;
    import Schedulable = Model.Schedulable;
    import Task = Model.Task;
    import Duration  = Model.WorkingCalendar.Duration;
    import Dependency  = Model.Dependency;
    import ResourceUsage = Model.Resources.ResourceUsage;

    export class TaskVO {
        isNew:boolean;
        isSummary:boolean = false;
        hasEarliestConstraint:boolean = false;

        name:string;
        description:string;
        parent:Summary;
        earliestStartConstraint:Date;
        resourceUsages:ResourceUsage[];
        dependencies:Dependency[];

        duration:Duration;


        constructor() {
            this.isNew = true;
            this.hasEarliestConstraint = false;
            this.duration = new Duration();
            this.isSummary = false;
            this.dependencies = [];
            this.resourceUsages = [];
            this.name = "";
        }

        static fromTask(task:Task):TaskVO {
            var result = new TaskVO();
            result.name = task.name;
            result.isNew = false;
            result.description = task.description;
            result.hasEarliestConstraint = task.earliestStartConstraint != null;
            result.earliestStartConstraint =  result.hasEarliestConstraint ? new Date(task.earliestStartConstraint.getTime()) : null;
            task.resourceUsages.forEach(res => result.resourceUsages.push(res));
            result.parent = task.parent;
            task.predecessors.forEach(dep => result.dependencies.push(dep));
            if (task instanceof  Summary) {
                var summary = <Summary>task;
                result.isSummary = true;
            } else {
                var schedulable = <Schedulable>task;
                result.isSummary = false;
                result.duration = Duration.clone(schedulable.duration);
            }
            return result;
        }

        merge(source:Task):Task {
            var result:Task = source;
            if (!this.isSummary) {
                var schedulable = <Schedulable>source;
                schedulable.duration = Duration.clone(this.duration);
            }
            var oldParentIdx = result.parent == null ? -1 : source.parent.tasks.indexOf(source);
            if (oldParentIdx != -1) result.parent.tasks.splice(oldParentIdx, 1);
            result.parent = this.parent;
            if (this.parent != null) {
                result.parent.tasks.push(source)
            }
            result.name = this.name;
            result.description = this.description;
            result.earliestStartConstraint = this.hasEarliestConstraint ? new Date(this.earliestStartConstraint.getTime()) : null;
            result.resourceUsages = [];
            this.resourceUsages.forEach(res => {
                result.resourceUsages.push(res)
            });
            result.predecessors.forEach(pred => {
                var idx = pred.task.successors.indexOf(pred);
                if (idx == -1) pred.task.successors.splice(idx, 1);
            });
            result.predecessors = [];
            this.dependencies.forEach(dep => {
                result.predecessors.push(dep);
                var newDep = new Dependency();
                newDep.task = result;
                newDep.lag = dep.lag;
                dep.task.successors.push(newDep);
            });
            return result;
        }
    }
}
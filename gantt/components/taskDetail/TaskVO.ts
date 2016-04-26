import {Task} from "../../Model/Task";
import {Schedulable} from "../../Model/Schedulable";
import {Summary} from "../../Model/Summary";
import {ResourceUsage} from "../../Model/Resources/ResourceUsage";
import {Dependency} from "../../Model/Dependency";
import {Duration} from "../../Model/WorkingCalendar/Duration";

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

    toDelete:boolean = false;

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
        result.earliestStartConstraint = result.hasEarliestConstraint ? new Date(task.earliestStartConstraint.getTime()) : null;
        task.resourceUsages.forEach(res => result.resourceUsages.push(res));
        result.parent = task.parent;
        task.predecessors.forEach(dep => result.dependencies.push(dep));
        if (task instanceof Summary) {
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
        source.name = this.name;
        source.description = this.description;
        source.earliestStartConstraint = this.hasEarliestConstraint ? this.earliestStartConstraint : null;

        if (!this.isSummary) {
            var schedulable = <Schedulable>source;
            schedulable.duration = this.duration;
        }
        var oldParentIdx = source.parent == null ? -1 : source.parent.tasks.indexOf(source);
        if (oldParentIdx != -1) source.parent.tasks.splice(oldParentIdx, 1);
        source.parent = this.parent;
        if (source.parent != null) {
            source.parent.tasks.push(source)
        }

        source.resourceUsages = [];
        this.resourceUsages.forEach(res => {
            source.resourceUsages.push(res)
        });
        source.predecessors.forEach(pred => {
            var idx = pred.task.successors.indexOf(pred);
            if (idx == -1) pred.task.successors.splice(idx, 1);
        });
        source.predecessors = [];
        this.dependencies.forEach(dep => {
            source.predecessors.push(dep);
            var newDep = new Dependency();
            newDep.task = source;
            newDep.lag = dep.lag;
            dep.task.successors.push(newDep);
        });
        return source;
    }
}

console.log('Task');
import {Hashable} from "../Util/Hashable";
import {ISerializable} from "../Util/Serializer";
import {ResourceUsage} from "./Resources/ResourceUsage";
import {HashSet} from "../Util/HashSet";
import {Dependency} from "./Dependency";


//abstract class (no TS support for that :( ), do not instantiate!
export class Task implements Hashable, ISerializable<Task> {

    id:number;

    name:string;
    description:string;
    successors:Dependency[];
    predecessors:Dependency[];
    parent:Summary;
    start:Date;
    finish:Date;
    earliestStartConstraint:Date;
    resourceUsages:ResourceUsage[];

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

    getSubTasks():HashSet<Schedulable> {
        return new HashSet<Schedulable>();
    }


    getAllTasks():Task[] {
        return [];
    }

    /**
     * Returns the task's predecessors, not including transitive predecessors
     * @returns {Dependency[]}
     */
    getPredecessors():Dependency[] {
        var result:Dependency[] = [];
        var that = this;
        for (var i:number = 0; i < this.predecessors.length; i++) {
            var subTasks = this.predecessors[i].task.getSubTasks();
            subTasks.each(function (task:Schedulable):boolean {
                var dep:Dependency = new Dependency();
                dep.task = task;
                dep.lag = that.predecessors[i].lag;
                result.push(dep);
                return true;
            });
        }
        if (this.parent != null) {
            var deps = this.parent.getPredecessors();
            for (var i:number = 0; i < deps.length; i++) {
                result.push(deps[i]);
            }
        }
        return result;
    }

    /**
     * Returns the task's successors, not including transitive successors
     * @returns {Dependency[]}
     */
    getSuccessors():Dependency[] {
        var result:Dependency[] = [];
        var that = this;
        for (var i:number = 0; i < this.successors.length; i++) {
            var subTasks = this.successors[i].task.getSubTasks();
            subTasks.each(function (task:Schedulable):boolean {
                var dep:Dependency = new Dependency();
                dep.task = task;
                dep.lag = that.successors[i].lag;
                result.push(dep);
                return true;
            });
        }
        if (this.parent != null) {
            var deps = this.parent.getSuccessors();
            for (var i:number = 0; i < deps.length; i++) {
                result.push(deps[i]);
            }
        }
        return result;
    }

    hash():number {
        return this.id;
    }

    getEarliestStartConstraint():Date {
        if (this.parent != null) {
            var parentDate:Date = this.parent.getEarliestStartConstraint();
            if (this.earliestStartConstraint == null ||
                (parentDate != null && parentDate.getTime() > this.earliestStartConstraint.getTime())) {
                return parentDate;
            }
        }
        return this.earliestStartConstraint;
    }


    getResourceUsages():ResourceUsage[] {
        var result = this.resourceUsages;
        if (this.parent != null) {
            result = result.concat(this.parent.getResourceUsages())
        }
        return result;
    }

    deserialize(input:any):Task {
        this.id = input.id;

        this.name = input.name;
        this.description = input.description;
        if (input.successors != null) {
            for (var i = 0; i < input.successors.length; i++) {
                this.successors.push(new Dependency().deserialize(input.successors[i]));
            }
        }
        if (input.predecessors != null) {
            for (var i = 0; i < input.predecessors.length; i++) {
                this.predecessors.push(new Dependency().deserialize(input.predecessors[i]));
            }
        }
        this.parent = input.parent != null ? <Summary>Task.deserializeHelper(input.parent) : null;
        this.start = input.start != null ? new Date(input.start) : null;
        this.finish = input.finish != null ? new Date(input.finish) : null;
        this.earliestStartConstraint = input.earliestStartConstraint != null ? new Date(input.earliestStartConstraint) : null;
        if (input.resourceUsages != null) {
            for (var i = 0; i < input.resourceUsages.length; i++) {
                this.resourceUsages.push(new ResourceUsage().deserialize(input.resourceUsages[i]));
            }
        }
        return this;
    }

    static deserializeHelper(task:any):Task {

        if (task.hasOwnProperty('tasks'))
            return new Summary().deserialize(task);
        if (task.hasOwnProperty('duration'))
            return new Schedulable().deserialize(task);
        return task;
        //throw "Not a task: " + task;
    }

    public getAllSummaries():Summary[] {
        return [];
    }

    public removeFromDependency(task: Task) {
        console.log("Removing " + task.name + " from " + this.name);
        var toRemove: Dependency[] = [];
        for(var i = 0; i < this.predecessors.length; i++) {
            if(task.id == this.predecessors[i].task.id) {
                toRemove.push(this.predecessors[i]);
            }
        }
        console.log(toRemove);
        for(var i= 0; i < toRemove.length; i++) {
            this.predecessors.splice(this.predecessors.indexOf(toRemove[i], 1));
        }
        console.log(this.predecessors);
    }
}
import {Schedulable} from "./Schedulable";
import {Summary} from "./Summary";
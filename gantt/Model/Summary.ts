///<reference path="../Util/HashSet.ts"/>
import {ISerializable} from "../Util/Serializer";
import {HashSet} from "../Util/HashSet";
import {Task} from "./Task";
import {Schedulable} from "./Schedulable";

export class Summary extends Task implements ISerializable<Summary> {

    tasks:Task[];

    constructor() {
        super();
        this.tasks = [];
    }

    getSubTasks():HashSet<Schedulable> {
        var result:HashSet<Schedulable> = super.getSubTasks();
        for (var i:number = 0; i < this.tasks.length; i++) {
            result.putAll(this.tasks[i].getSubTasks());
        }
        return result;
    }

    getAllTasks():Task[] {
        var result = super.getAllTasks();
        for (var i:number = 0; i < this.tasks.length; i++) {
            result = result.concat(this.tasks[i].getAllTasks());
        }
        result.push(this);
        return result;
    }

    notifyScheduled(task:Task) {
        if (this.finish == null || this.finish.getTime() < task.finish.getTime()) {
            this.finish = new Date(task.finish.getTime());
        }
        if (this.start == null || this.start.getTime() > task.start.getTime()) {
            this.start = new Date(task.start.getTime());
        }
        if (this.parent != null) {
            this.parent.notifyScheduled(this);
        }
    }

    deserialize(input:any):Summary {
        super.deserialize(input);
        if (input.tasks != null) {
            for (var i = 0; i < input.tasks.length; i++) {
                this.tasks.push(Task.deserializeHelper(input.tasks[i]));
            }
        }

        return this;
    }


    public getAllSummaries():Summary[] {
        var result:Summary[] = [this];
        for (var i:number = 0; i < this.tasks.length; i++) {
            result = result.concat(this.tasks[i].getAllSummaries());
        }
        return result;
    }
}
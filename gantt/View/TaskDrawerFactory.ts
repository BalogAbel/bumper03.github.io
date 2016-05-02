import {SummaryDrawer} from "./SummaryDrawer";
import {Summary} from "../Model/Summary";
import {SchedulableDrawer} from "./SchedulableDrawer";
import {Schedulable} from "../Model/Schedulable";
import {TaskDrawer} from "./TaskDrawer";
import {Task} from "../Model/Task";
import {DependencyDrawer} from "./DependencyDrawer";
export class TaskDrawerFactory {

    private static taskDrawers: TaskDrawer[] = [];

    static reset(): void {
        this.taskDrawers = [];
    }

    static getTaskDrawer(task:Task):TaskDrawer {
        var drawer:TaskDrawer;

        if (task instanceof Summary) drawer = TaskDrawerFactory.getSummaryDrawer(<Summary>task);
        else if (task instanceof Schedulable) drawer = new SchedulableDrawer();
        else throw("Task type error");

        drawer.task = task;
        this.taskDrawers.push(drawer);
        return drawer;
    }

    private static getSummaryDrawer(summary:Summary):SummaryDrawer {
        var sumDrawer:SummaryDrawer = new SummaryDrawer();
        sumDrawer.task = summary;
        for (var i:number = 0; i < summary.tasks.length; i++) {
            var drawer = TaskDrawerFactory.getTaskDrawer(summary.tasks[i]);
            sumDrawer.subDrawers.push(drawer);
            this.taskDrawers.push(drawer);
        }
        return sumDrawer;
    }

    public static getDependencyDrawers(): DependencyDrawer[] {
        var result: DependencyDrawer[] = [];
        for(var i= 0; i < this.taskDrawers.length; i++) {
            for (var j = 0; j < this.taskDrawers[i].task.successors.length; j++) {
                var fromDrawer:TaskDrawer;
                this.taskDrawers.forEach((drawer:TaskDrawer) => {
                    if (drawer.task.id == this.taskDrawers[i].task.successors[j].task.id) fromDrawer = drawer;
                });
                result.push(new DependencyDrawer(this.taskDrawers[i], fromDrawer));
            }
        }
        return result;
    }


}
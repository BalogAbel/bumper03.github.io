import {SummaryDrawer} from "./SummaryDrawer";
import {Summary} from "../Model/Summary";
import {SchedulableDrawer} from "./SchedulableDrawer";
import {Schedulable} from "../Model/Schedulable";
import {TaskDrawer} from "./TaskDrawer";
import {Task} from "../Model/Task";
export class TaskDrawerFactory {
    static getTaskDrawer(task:Task):TaskDrawer {
        var drawer:TaskDrawer;

        if (task instanceof Summary) drawer = TaskDrawerFactory.getSummaryDrawer(<Summary>task);
        else if (task instanceof Schedulable) drawer = new SchedulableDrawer();
        else throw("Task type error");

        drawer.task = task;
        return drawer;
    }

    private static getSummaryDrawer(summary:Summary):SummaryDrawer {
        var sumDrawer:SummaryDrawer = new SummaryDrawer();
        sumDrawer.task = summary;
        for (var i:number = 0; i < summary.tasks.length; i++) {
            sumDrawer.subDrawers.push(TaskDrawerFactory.getTaskDrawer(summary.tasks[i]))
        }
        return sumDrawer;
    }

}
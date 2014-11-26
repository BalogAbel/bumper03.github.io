///<reference path='../Model/Summary.ts'/>
///<reference path='../Model/Schedulable.ts'/>
///<reference path='../Model/Task.ts'/>
///<reference path='SummaryDrawer.ts'/>
///<reference path='SchedulableDrawer.ts'/>
///<reference path='TaskDrawer.ts'/>


module View {
    import Schedulable = Model.Schedulable;
    import Summary = Model.Summary;
    import Task = Model.Task;
    import SchedulableDrawer = View.SchedulableDrawer;
    import SummaryDrawer = View.SummaryDrawer;
    import TaskDrawer = View.TaskDrawer;

    export class TaskDrawerFactory {
        static getTaskDrawer(task:Task): TaskDrawer {
            var drawer: TaskDrawer;

            if(task instanceof Summary) drawer = TaskDrawerFactory.getSummaryDrawer(<Summary>task);
            else if(task instanceof Schedulable) drawer = new SchedulableDrawer();
            else throw("Task type error");

            drawer.task  = task;
            return drawer;
        }

        private static getSummaryDrawer(summary:Summary): SummaryDrawer{
            var sumDrawer: SummaryDrawer = new SummaryDrawer();
            sumDrawer.task = summary;
            for(var i: number = 0; i < summary.tasks.length; i++) {
                sumDrawer.subDrawers.push(TaskDrawerFactory.getTaskDrawer(summary.tasks[i]))
            }
            return sumDrawer;
        }

    }
}
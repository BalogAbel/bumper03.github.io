import {Scheduler} from "./Scheduler";
import {ISerializable} from "../../Util/Serializer";
import {Schedulable} from "../Schedulable";
import {ResourceManager} from "./ResourceManager";
import {WorkingCalendar} from "../WorkingCalendar/WorkingCalendar";
import {Dependency} from "../Dependency";

export class LeastSlackTimeScheduler extends Scheduler implements ISerializable<LeastSlackTimeScheduler> {

    private leastSlackTimeScheduler:string = 'DO_NOT_REMOVE!!';


    public schedule(tasksParam:Schedulable[]) {
        this.resourceManager = new ResourceManager();
        var tasks = tasksParam.slice(0);

        tasks = tasks.sort((t, t2):number => {
            var slackTime1 = t.latestFinish.getTime() - t.earliestFinish.getTime();
            var slackTime2 = t2.latestFinish.getTime() - t2.earliestFinish.getTime();
            return slackTime1 - slackTime2;
        });

        var completed:Schedulable[] = [];
        while (tasks.length > 0) {
            var taskToSchedule:Schedulable = null;
            for (var i = 0; i < tasks.length && taskToSchedule == null; i++) {
                var ready = tasks[i].getPredecessors().every(pred => {
                    for(var j = 0; j < completed.length; j++) {
                        if(pred.task.id == completed[j].id) return true;
                    }
                    return false;
                });
                if(ready) {
                    taskToSchedule = tasks[i];
                }
            }
            if (taskToSchedule != null) {
                this.allocateResources(taskToSchedule);
                completed.push(taskToSchedule);
                var index = tasks.indexOf(taskToSchedule);
                if (index > -1) tasks.splice(index, 1);
            } else {
                throw("error")
            }

        }


    }

    private allocateResources(task:Schedulable) {
        var workingCalendar = WorkingCalendar.getWorkingCalendar();

        var predecessors:Dependency[] = task.getPredecessors();
        var start:Date = new Date(task.earliestStart.getTime());
        for (var i:number = 0; i < predecessors.length; i++) {
            var actualDate = new Date(predecessors[i].task.finish.getTime());
            actualDate = workingCalendar.add(actualDate, predecessors[i].lag);
            if (actualDate.getTime() > start.getTime()) start.setTime(actualDate.getTime());
        }
        var newStart = this.resourceManager.allocateTask(task, start);
        task.start = newStart;
        task.finish = workingCalendar.add(newStart, task.duration);

        if (task.parent != null) {
            task.parent.notifyScheduled(task);
        }
    }

    deserialize(input:any):LeastSlackTimeScheduler {
        super.deserialize(input);
        return this;
    }
}
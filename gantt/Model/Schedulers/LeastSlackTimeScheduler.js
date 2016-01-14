var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scheduler_1 = require("./Scheduler");
var ResourceManager_1 = require("./ResourceManager");
var WorkingCalendar_1 = require("../WorkingCalendar/WorkingCalendar");
var LeastSlackTimeScheduler = (function (_super) {
    __extends(LeastSlackTimeScheduler, _super);
    function LeastSlackTimeScheduler() {
        _super.apply(this, arguments);
        this.leastSlackTimeScheduler = 'DO_NOT_REMOVE!!';
    }
    LeastSlackTimeScheduler.prototype.schedule = function (tasksParam) {
        this.resourceManager = new ResourceManager_1.ResourceManager();
        var tasks = tasksParam.slice(0);
        tasks.sort(function (t, t2) {
            var slackTime1 = t.latestFinish.getTime() - t.earliestFinish.getTime();
            var slackTime2 = t2.latestFinish.getTime() - t2.earliestFinish.getTime();
            return slackTime1 - slackTime2;
        });
        var completed = [];
        while (tasks.length > 0) {
            var taskToSchedule = null;
            tasks.some(function (task) {
                var predecessors = task.getPredecessors();
                for (var i = 0; i < predecessors.length; i++) {
                    var pred = predecessors[i];
                    if (completed.indexOf(pred.task) < 0)
                        return false;
                }
                taskToSchedule = task;
                return true;
            });
            if (taskToSchedule != null) {
                this.allocateResources(taskToSchedule);
                completed.push(taskToSchedule);
                var index = tasks.indexOf(taskToSchedule);
                if (index > -1)
                    tasks.splice(index, 1);
            }
        }
    };
    LeastSlackTimeScheduler.prototype.allocateResources = function (task) {
        var workingCalendar = WorkingCalendar_1.WorkingCalendar.getWorkingCalendar();
        var predecessors = task.getPredecessors();
        var start = new Date(task.earliestStart.getTime());
        var defaultStart = new Date(start.getTime());
        for (var i = 0; i < predecessors.length; i++) {
            var actualDate = new Date(predecessors[i].task.finish.getTime());
            actualDate = workingCalendar.add(actualDate, predecessors[i].lag);
            if (actualDate.getTime() > start.getTime())
                start.setTime(actualDate.getTime());
        }
        var finish = workingCalendar.add(start, task.duration);
        var allocationSucces = false;
        //while(!allocationSucces) {
        //	allocationSucces = true;
        //	var resources = task.getResourceUsages();
        var newStart = this.resourceManager.allocateTask(task, start);
        //resources.forEach(resource => {
        //	for(var i = 0; i < resource.need; i++) {
        //		var newStart = that.resourceManager.allocateResource(resource.resource, start, task.duration);
        //		if(newStart != null) {
        //			allocationSucces = false;
        //			start.setTime(newStart.getTime());
        //			finish = workingCalendar.add(newStart, task.duration);
        //			return;
        //		}
        //	}
        //});
        //}
        task.start = newStart;
        task.finish = workingCalendar.add(newStart, task.duration);
        if (task.parent != null) {
            task.parent.notifyScheduled(task);
        }
    };
    LeastSlackTimeScheduler.prototype.deserialize = function (input) {
        _super.prototype.deserialize.call(this, input);
        return this;
    };
    return LeastSlackTimeScheduler;
})(Scheduler_1.Scheduler);
exports.LeastSlackTimeScheduler = LeastSlackTimeScheduler;
//# sourceMappingURL=LeastSlackTimeScheduler.js.map
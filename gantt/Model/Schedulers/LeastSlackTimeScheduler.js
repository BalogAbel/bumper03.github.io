///<reference path='../../../references.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Model;
(function (Model) {
    var Schedulers;
    (function (Schedulers) {
        var Scheduler = Model.Schedulers.Scheduler;
        var ResourceManager = Model.Schedulers.ResourceManager;
        var WorkingCalendar = Model.WorkingCalendar.WorkingCalendar;
        var LeastSlackTimeScheduler = (function (_super) {
            __extends(LeastSlackTimeScheduler, _super);
            function LeastSlackTimeScheduler() {
                _super.apply(this, arguments);
                this.leastSlackTimeScheduler = 'DO_NOT_REMOVE!!';
            }
            LeastSlackTimeScheduler.prototype.schedule = function (tasksParam) {
                this.resourceManager = new ResourceManager();
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
                var workingCalendar = WorkingCalendar.getWorkingCalendar();
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
                while (!allocationSucces) {
                    allocationSucces = true;
                    var resources = task.getResourceUsages();
                    var that = this;
                    resources.forEach(function (resource) {
                        for (var i = 0; i < resource.need; i++) {
                            var newStart = that.resourceManager.allocateResource(resource.resource, start, task.duration);
                            if (newStart != null) {
                                allocationSucces = false;
                                start.setTime(newStart.getTime());
                                finish = workingCalendar.add(newStart, task.duration);
                                return;
                            }
                        }
                    });
                }
                task.finish = new Date(finish.getTime());
                task.start = new Date(start.getTime());
                if (task.parent != null) {
                    task.parent.notifyScheduled(task);
                }
            };
            LeastSlackTimeScheduler.prototype.deserialize = function (input) {
                _super.prototype.deserialize.call(this, input);
                return this;
            };
            return LeastSlackTimeScheduler;
        })(Scheduler);
        Schedulers.LeastSlackTimeScheduler = LeastSlackTimeScheduler;
    })(Schedulers = Model.Schedulers || (Model.Schedulers = {}));
})(Model || (Model = {}));
//# sourceMappingURL=LeastSlackTimeScheduler.js.map
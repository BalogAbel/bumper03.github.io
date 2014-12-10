///<reference path='Scheduler.ts'/>
///<reference path='ResourceManager.ts'/>
///<reference path='../Schedulable.ts'/>
///<reference path='../WorkingCalendar/WorkingCalendar.ts'/>
var Model;
(function (Model) {
    (function (Schedulers) {
        var ResourceManager = Model.Schedulers.ResourceManager;

        var WorkingCalendar = Model.WorkingCalendar.WorkingCalendar;

        var LeastSlackTimeScheduler = (function () {
            function LeastSlackTimeScheduler() {
                this.resourceManager = new ResourceManager();
            }
            LeastSlackTimeScheduler.prototype.schedule = function (tasksParam) {
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
                console.log(task.name);
                while (!allocationSucces) {
                    allocationSucces = true;
                    var resources = task.getResourceUsages();
                    var that = this;
                    resources.forEach(function (resource) {
                        for (var i = 0; i < resource.need; i++) {
                            var newStart = that.resourceManager.allocateResource(resource.resource, start, finish);
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
            return LeastSlackTimeScheduler;
        })();
        Schedulers.LeastSlackTimeScheduler = LeastSlackTimeScheduler;
    })(Model.Schedulers || (Model.Schedulers = {}));
    var Schedulers = Model.Schedulers;
})(Model || (Model = {}));
//# sourceMappingURL=LeastSlackTimeScheduler.js.map

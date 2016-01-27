var Task_1 = require("./Task");
var WorkingCalendar_1 = require("./WorkingCalendar/WorkingCalendar");
var ResourceType_1 = require("./Resources/ResourceType");
var Scheduler_1 = require("./Schedulers/Scheduler");
var LeastSlackTimeScheduler_1 = require("./Schedulers/LeastSlackTimeScheduler");
var HashSet_1 = require("../Util/HashSet");
var Project = (function () {
    function Project() {
        this.tasks = [];
        this.start = new Date();
        this.start.setHours(0, 0, 0, 0);
        this.scheduler = new LeastSlackTimeScheduler_1.LeastSlackTimeScheduler();
        this.workingCalendar = WorkingCalendar_1.WorkingCalendar.getWorkingCalendar();
        this.resourceTypes = [];
    }
    /**
     *
     */
    Project.prototype.schedule = function () {
        var that = this;
        for (var i = 0; i < this.tasks.length; i++) {
            this.tasks[i].reset();
        }
        var tasks = this.collectAllTasks();
        this.calculateEarliestTimes(tasks);
        this.calculateLatestTimes(tasks);
        this.scheduler.schedule(tasks);
        this.finish = new Date(this.start.getTime());
        this.tasks.forEach(function (task) {
            if (that.finish.getTime() < task.finish.getTime())
                that.finish.setTime(task.finish.getTime());
        });
    };
    /**
     *
     * @returns {Util.HashSet}
     */
    Project.prototype.calculateEarliestTimes = function (tasks) {
        this.earliestFinish = new Date(this.start.getTime());
        var remaining = tasks.slice(0);
        var completed = [];
        try {
            while (remaining.length != 0) {
                var progress = false;
                for (var i = remaining.length - 1; i >= 0; i--) {
                    var schedulable = remaining[i];
                    var dependencies = schedulable.getPredecessors();
                    var containsAll = true;
                    dependencies.forEach(function (dependency) {
                        if (completed.indexOf(dependency.task) == -1) {
                            containsAll = false;
                        }
                    });
                    if (containsAll) {
                        var index = remaining.indexOf(schedulable);
                        if (index > -1)
                            remaining.splice(index, 1);
                        schedulable.calculateCriticalCost(this.start, dependencies);
                        if (this.earliestFinish.getTime() < schedulable.earliestFinish.getTime()) {
                            this.earliestFinish.setTime(schedulable.earliestFinish.getTime());
                        }
                        progress = true;
                        completed.push(schedulable);
                    }
                }
                if (!progress) {
                    throw ("Cyclic dependency, algorithm stopped!");
                }
            }
        }
        catch (err) {
            alert("Error: " + err);
            throw err;
        }
    };
    /**
     *
     * @returns {Util.HashSet}
     */
    Project.prototype.calculateLatestTimes = function (tasks) {
        var endingTasks = this.getEndingTasks(tasks);
        var that = this;
        endingTasks.forEach(function (task) {
            task.calculateLatest(that.earliestFinish);
        });
    };
    Project.prototype.getEndingTasks = function (tasks) {
        var result = tasks.slice(0);
        tasks.forEach(function (task) {
            task.getPredecessors().forEach(function (pred) {
                var index = result.indexOf(pred.task);
                if (index > -1)
                    result.splice(index, 1);
            });
        });
        return result;
    };
    /**
     *
     * @returns {Schedulable[]}
     */
    Project.prototype.collectAllTasks = function () {
        var result = new HashSet_1.HashSet();
        for (var i = 0; i < this.tasks.length; i++) {
            result.putAll(this.tasks[i].getSubTasks());
        }
        return result.toArray().filter(function (s) { return s != undefined; });
    };
    Project.prototype.deserialize = function (input) {
        if (!input.hasOwnProperty('start'))
            return input;
        this.start = input.start != null ? new Date(input.start) : null;
        for (var i = 0; i < input.tasks.length; i++) {
            this.tasks.push(Task_1.Task.deserializeHelper(input.tasks[i]));
        }
        for (var i = 0; i < input.resourceTypes.length; i++) {
            this.resourceTypes.push(new ResourceType_1.ResourceType().deserialize(input.resourceTypes[i]));
        }
        this.workingCalendar = new WorkingCalendar_1.WorkingCalendar().deserialize(input.workingCalendar);
        this.scheduler = Scheduler_1.Scheduler.deserializeHelper(input.scheduler);
        this.name = input.name;
        return this;
    };
    Project.prototype.getAllSummaries = function () {
        var result = [];
        for (var i = 0; i < this.tasks.length; i++) {
            result = result.concat(this.tasks[i].getAllSummaries());
        }
        return result;
    };
    Project.prototype.getAllTasks = function () {
        var result = [];
        for (var i = 0; i < this.tasks.length; i++) {
            result = result.concat(this.tasks[i].getAllTasks());
        }
        return result;
    };
    return Project;
})();
exports.Project = Project;
//# sourceMappingURL=Project.js.map
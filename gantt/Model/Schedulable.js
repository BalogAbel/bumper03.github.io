var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HashSet_1 = require("../Util/HashSet");
var Duration_1 = require("./WorkingCalendar/Duration");
var WorkingCalendar_1 = require("./WorkingCalendar/WorkingCalendar");
var Task_1 = require("./Task");
var Schedulable = (function (_super) {
    __extends(Schedulable, _super);
    function Schedulable() {
        _super.apply(this, arguments);
    }
    Schedulable.prototype.getSubTasks = function () {
        var result = new HashSet_1.HashSet();
        result.put(this);
        return result;
    };
    Schedulable.prototype.calculateCriticalCost = function (projectStartDate, predecessors) {
        if (predecessors === void 0) { predecessors = null; }
        if (predecessors == null) {
            predecessors = this.getPredecessors();
        }
        var workingCalendar = WorkingCalendar_1.WorkingCalendar.getWorkingCalendar();
        var start = new Date(projectStartDate.getTime());
        var defaultStart = new Date(projectStartDate.getTime());
        for (var i = 0; i < predecessors.length; i++) {
            var actualDate = new Date(predecessors[i].task.earliestFinish.getTime());
            actualDate = workingCalendar.add(actualDate, predecessors[i].lag);
            if (actualDate.getTime() > start.getTime())
                start.setTime(actualDate.getTime());
        }
        var earliestStartConstraint = this.getEarliestStartConstraint();
        if (earliestStartConstraint != null && earliestStartConstraint.getTime() > start.getTime()) {
            start.setTime(earliestStartConstraint.getTime());
        }
        workingCalendar.setToWorkingPeriod(start);
        this.earliestStart = new Date(start.getTime());
        this.earliestFinish = workingCalendar.add(start, this.duration);
    };
    Schedulable.prototype.calculateLatest = function (projectEndDate) {
        var successors = this.getSuccessors();
        var workingCalendar = WorkingCalendar_1.WorkingCalendar.getWorkingCalendar();
        var finish = new Date(projectEndDate.getTime());
        var defaultFinish = new Date(projectEndDate.getTime());
        for (var i = 0; i < successors.length; i++) {
            var actualDate = new Date(successors[i].task.latestStart.getTime());
            actualDate = workingCalendar.subTract(actualDate, successors[i].lag);
            if (actualDate.getTime() < finish.getTime())
                finish.setTime(actualDate.getTime());
        }
        workingCalendar.setToWorkingPeriod(finish, true);
        this.latestFinish = new Date(finish.getTime());
        this.latestStart = workingCalendar.subTract(finish, this.duration);
        var predecessors = this.getPredecessors();
        predecessors.sort(function (a, b) {
            return b.task.earliestStart.getTime() - a.task.earliestStart.getTime();
        });
        predecessors.forEach(function (dependency) {
            dependency.task.calculateLatest(projectEndDate);
        });
    };
    Schedulable.prototype.deserialize = function (input) {
        _super.prototype.deserialize.call(this, input);
        this.duration = new Duration_1.Duration().deserialize(input.duration);
        this.earliestStart = new Date(input.earliestStart);
        this.earliestFinish = new Date(input.earliestFinish);
        this.latestStart = new Date(input.latestStart);
        this.latestFinish = new Date(input.latestFinish);
        return this;
    };
    Schedulable.prototype.getAllTasks = function () {
        return [this];
    };
    return Schedulable;
})(Task_1.Task);
exports.Schedulable = Schedulable;
//# sourceMappingURL=Schedulable.js.map
///<reference path='Task.ts'/>
///<reference path='Dependency.ts'/>
///<reference path='../Util/HashSet.ts'/>
///<reference path='WorkingCalendar/WorkingCalendar.ts'/>
///<reference path='WorkingCalendar/Duration.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Model;
(function (Model) {
    var WorkingCalendar = Model.WorkingCalendar.WorkingCalendar;
    var Duration = Model.WorkingCalendar.Duration;
    var Task = Model.Task;

    var HashSet = Util.HashSet;

    var Schedulable = (function (_super) {
        __extends(Schedulable, _super);
        function Schedulable() {
            _super.apply(this, arguments);
        }
        Schedulable.prototype.getSubTasks = function () {
            var result = new HashSet();
            result.put(this);
            return result;
        };

        Schedulable.prototype.calculateTime = function (projectStartDate) {
            if (this.criticalCost != null) {
                var workingCalendar = WorkingCalendar.getWorkingCalendar();

                var dependencies = this.getDependencies();
                var start = new Date(projectStartDate.getTime());
                var defaultStart = new Date(projectStartDate.getTime());
                for (var i = 0; i < dependencies.length; i++) {
                    var actualDate = new Date(dependencies[i].task.finish.getTime());
                    workingCalendar.add(actualDate, dependencies[i].lag);
                    if (actualDate.getTime() > start.getTime())
                        start.setTime(actualDate.getTime());
                }
                var earliestStartConstraint = this.getEarliestStartConstraint();
                if (earliestStartConstraint != null && earliestStartConstraint.getTime() > start.getTime()) {
                    start.setTime(earliestStartConstraint.getTime());
                }
                workingCalendar.setToWorkingPeriod(start);
                this.start = new Date(start.getTime());
                workingCalendar.add(start, this.duration);
                this.finish = new Date(start.getTime());

                if (this.parent != null) {
                    this.parent.notifyScheduled(this);
                }
            }
        };

        Schedulable.prototype.getCriticalCost = function () {
            return this.criticalCost;
        };

        Schedulable.prototype.calculateCriticalCost = function (dependencies) {
            if (typeof dependencies === "undefined") { dependencies = null; }
            var criticalCost = new Duration();
            if (dependencies == null) {
                dependencies = this.getDependencies();
            }

            for (var i = 0; i < dependencies.length; i++) {
                if (dependencies[i].getCriticalCost().equals(criticalCost) > 0)
                    criticalCost = dependencies[i].getCriticalCost();
            }
            this.criticalCost = criticalCost.add(this.duration);
        };
        return Schedulable;
    })(Task);
    Model.Schedulable = Schedulable;
})(Model || (Model = {}));
//# sourceMappingURL=Schedulable.js.map

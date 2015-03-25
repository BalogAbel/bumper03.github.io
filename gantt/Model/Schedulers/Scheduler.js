///<reference path='../../../references.ts'/>
var Model;
(function (Model) {
    var Schedulers;
    (function (Schedulers) {
        var Scheduler = (function () {
            function Scheduler() {
            }
            Scheduler.prototype.schedule = function (tasksParam) {
                return;
            };
            Scheduler.prototype.deserialize = function (input) {
                return this;
            };
            Scheduler.deserializeHelper = function (input) {
                if (input.hasOwnProperty('leastSlackTimeScheduler'))
                    return new Schedulers.LeastSlackTimeScheduler().deserialize(input);
                throw "Not a scheduler";
            };
            return Scheduler;
        })();
        Schedulers.Scheduler = Scheduler;
        var SchedulerHelper = (function () {
            function SchedulerHelper() {
            }
            SchedulerHelper.deserialize = function (scheduler) {
                if (scheduler.hasOwnProperty('leastSlactTimeScheduler'))
                    return new Schedulers.LeastSlackTimeScheduler().deserialize(scheduler);
                throw "Not an scheduler: " + scheduler;
            };
            return SchedulerHelper;
        })();
        Schedulers.SchedulerHelper = SchedulerHelper;
    })(Schedulers = Model.Schedulers || (Model.Schedulers = {}));
})(Model || (Model = {}));
//# sourceMappingURL=Scheduler.js.map
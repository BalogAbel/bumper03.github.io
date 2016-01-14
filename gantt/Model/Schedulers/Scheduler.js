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
            return new LeastSlackTimeScheduler_1.LeastSlackTimeScheduler().deserialize(input);
        throw "Not a scheduler";
    };
    return Scheduler;
})();
exports.Scheduler = Scheduler;
var SchedulerHelper = (function () {
    function SchedulerHelper() {
    }
    SchedulerHelper.deserialize = function (scheduler) {
        if (scheduler.hasOwnProperty('leastSlactTimeScheduler'))
            return new LeastSlackTimeScheduler_1.LeastSlackTimeScheduler().deserialize(scheduler);
        throw "Not an scheduler: " + scheduler;
    };
    return SchedulerHelper;
})();
exports.SchedulerHelper = SchedulerHelper;
var LeastSlackTimeScheduler_1 = require("./LeastSlackTimeScheduler");
//# sourceMappingURL=Scheduler.js.map
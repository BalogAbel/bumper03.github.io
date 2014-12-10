///<reference path='../Schedulable.ts'/>
var Model;
(function (Model) {
    (function (Schedulers) {
        var Scheduler = (function () {
            function Scheduler() {
            }
            Scheduler.prototype.schedule = function (tasksParam) {
                return null;
            };
            return Scheduler;
        })();
        Schedulers.Scheduler = Scheduler;
    })(Model.Schedulers || (Model.Schedulers = {}));
    var Schedulers = Model.Schedulers;
})(Model || (Model = {}));
//# sourceMappingURL=Scheduler.js.map

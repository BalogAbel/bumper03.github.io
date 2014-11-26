///<reference path='WorkingCalendar/Duration.ts'/>
///<reference path='Task.ts'/>
///<reference path='Schedulable.ts'/>
///<reference path='../Util/HashSet.ts'/>
///<reference path='../Util/Hashable.ts'/>
var Model;
(function (Model) {
    var Duration = Model.WorkingCalendar.Duration;

    var Dependency = (function () {
        function Dependency() {
            this.lag = new Duration();
        }
        Dependency.prototype.getCriticalCost = function () {
            return this.task.getCriticalCost().add(this.lag);
        };

        Dependency.prototype.hash = function () {
            return this.id;
        };
        return Dependency;
    })();
    Model.Dependency = Dependency;
})(Model || (Model = {}));
//# sourceMappingURL=Dependency.js.map

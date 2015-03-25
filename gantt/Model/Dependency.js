///<reference path='../../references.ts'/>
var Model;
(function (Model) {
    var Task = Model.Task;
    var Duration = Model.WorkingCalendar.Duration;
    var Dependency = (function () {
        function Dependency() {
            this.lag = new Duration();
        }
        Dependency.prototype.hash = function () {
            return this.id;
        };
        Dependency.prototype.deserialize = function (input) {
            this.id = input.id;
            this.task = Task.deserializeHelper(input.task);
            this.lag = new Duration().deserialize(input.lag);
            return this;
        };
        return Dependency;
    })();
    Model.Dependency = Dependency;
})(Model || (Model = {}));
//# sourceMappingURL=Dependency.js.map
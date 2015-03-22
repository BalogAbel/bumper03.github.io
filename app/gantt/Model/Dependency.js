///<reference path='../../../references.ts'/>
var Model;
(function (Model) {
    var Duration = Model.WorkingCalendar.Duration;
    var Dependency = (function () {
        function Dependency() {
            this.lag = new Duration();
        }
        Dependency.prototype.hash = function () {
            return this.id;
        };
        return Dependency;
    })();
    Model.Dependency = Dependency;
})(Model || (Model = {}));
//# sourceMappingURL=Dependency.js.map
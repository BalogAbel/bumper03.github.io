///<reference path='../../references.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Model;
(function (Model) {
    var Summary = (function (_super) {
        __extends(Summary, _super);
        function Summary() {
            _super.call(this);
            this.tasks = [];
        }
        Summary.prototype.getSubTasks = function () {
            var result = _super.prototype.getSubTasks.call(this);
            for (var i = 0; i < this.tasks.length; i++) {
                result.putAll(this.tasks[i].getSubTasks());
            }
            return result;
        };
        Summary.prototype.notifyScheduled = function (task) {
            if (this.finish == null || this.finish.getTime() < task.finish.getTime()) {
                this.finish = new Date(task.finish.getTime());
            }
            if (this.start == null || this.start.getTime() > task.start.getTime()) {
                this.start = new Date(task.start.getTime());
            }
            if (this.parent != null) {
                this.parent.notifyScheduled(this);
            }
        };
        return Summary;
    })(Model.Task);
    Model.Summary = Summary;
})(Model || (Model = {}));
//# sourceMappingURL=Summary.js.map
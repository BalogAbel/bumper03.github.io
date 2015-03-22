///<reference path='../../../references.ts'/>
var Model;
(function (Model) {
    var HashSet = Util.HashSet;
    //abstract class (no TS support for that :( ), do not instantiate!
    var Task = (function () {
        function Task() {
            this.predecessors = [];
            this.successors = [];
            this.parent = null;
            this.earliestStartConstraint = null;
            this.resourceUsages = [];
        }
        Task.prototype.reset = function () {
            this.start = null;
            this.finish = null;
        };
        Task.prototype.getSubTasks = function () {
            return new HashSet();
        };
        /**
         * Returns the task's predecessors, not including transitive predecessors
         * @returns {Dependency[]}
         */
        Task.prototype.getPredecessors = function () {
            var result = [];
            var that = this;
            for (var i = 0; i < this.predecessors.length; i++) {
                var subTasks = this.predecessors[i].task.getSubTasks();
                subTasks.each(function (task) {
                    var dep = new Model.Dependency();
                    dep.task = task;
                    dep.lag = that.predecessors[i].lag;
                    result.push(dep);
                    return true;
                });
            }
            if (this.parent != null) {
                var deps = this.parent.getPredecessors();
                for (var i = 0; i < deps.length; i++) {
                    result.push(deps[i]);
                }
            }
            return result;
        };
        /**
         * Returns the task's successors, not including transitive successors
         * @returns {Dependency[]}
         */
        Task.prototype.getSuccessors = function () {
            var result = [];
            var that = this;
            for (var i = 0; i < this.successors.length; i++) {
                var subTasks = this.successors[i].task.getSubTasks();
                subTasks.each(function (task) {
                    var dep = new Model.Dependency();
                    dep.task = task;
                    dep.lag = that.successors[i].lag;
                    result.push(dep);
                    return true;
                });
            }
            if (this.parent != null) {
                var deps = this.parent.getSuccessors();
                for (var i = 0; i < deps.length; i++) {
                    result.push(deps[i]);
                }
            }
            return result;
        };
        Task.prototype.hash = function () {
            return this.id;
        };
        Task.prototype.getEarliestStartConstraint = function () {
            if (this.parent != null) {
                var parentDate = this.parent.getEarliestStartConstraint();
                if (this.earliestStartConstraint == null || (parentDate != null && parentDate.getTime() > this.earliestStartConstraint.getTime())) {
                    return parentDate;
                }
            }
            return this.earliestStartConstraint;
        };
        Task.prototype.getResourceUsages = function () {
            var result = this.resourceUsages;
            if (this.parent != null) {
                result = result.concat(this.parent.getResourceUsages());
            }
            return result;
        };
        return Task;
    })();
    Model.Task = Task;
})(Model || (Model = {}));
//# sourceMappingURL=Task.js.map
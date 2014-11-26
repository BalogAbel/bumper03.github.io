///<reference path='Dependency.ts'/>
///<reference path='Schedulable.ts'/>
///<reference path='../Util/Hashable.ts'/>
///<reference path='../Util/HashSet.ts'/>
///<reference path='Summary.ts'/>
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
        }
        Task.prototype.reset = function () {
            this.start = null;
            this.finish = null;
        };

        Task.prototype.getSubTasks = function () {
            return new HashSet();
        };

        /**
        * Returns the task's dependencies, not including transitive dependencies
        * @returns {Dependency[]}
        */
        Task.prototype.getDependencies = function () {
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
                var deps = this.parent.getDependencies();
                for (var i = 0; i < deps.length; i++) {
                    result.push(deps[i]);
                }
            }
            return result;
        };

        Task.prototype.getCriticalCost = function () {
            return null;
        };

        Task.prototype.hash = function () {
            return this.id;
        };

        Task.prototype.getEarliestStartConstraint = function () {
            if (this.parent != null && this.earliestStartConstraint != null) {
                var parentDate = this.parent.getEarliestStartConstraint();
                if (parentDate != null && parentDate.getTime() > this.earliestStartConstraint.getTime()) {
                    return parentDate;
                }
            }
            return this.earliestStartConstraint;
        };
        return Task;
    })();
    Model.Task = Task;
})(Model || (Model = {}));
//# sourceMappingURL=Task.js.map

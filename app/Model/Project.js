///<reference path='Task.ts'/>
///<reference path='Schedulable.ts'/>
///<reference path='Summary.ts'/>
///<reference path='../Util/HashSet.ts'/>
///<reference path='WorkingCalendar/WorkingCalendar.ts'/>
var Model;
(function (Model) {
    var HashSet = Util.HashSet;

    /**
    *
    */
    var Project = (function () {
        function Project() {
            this.tasks = [];
            this.start = new Date();
            this.start.setHours(0, 0, 0, 0);
        }
        /**
        *
        */
        Project.prototype.schedule = function () {
            for (var i = 0; i < this.tasks.length; i++) {
                this.tasks[i].reset();
            }
            var tasks = this.calculateAllCriticalCosts();
            var orderedTasks = [];
            tasks.each(function (s) {
                orderedTasks.push(s);
                return true;
            });
            orderedTasks.sort(function (a, b) {
                return a.criticalCost.equals(b.criticalCost);
            });

            for (var i = 0; i < orderedTasks.length; i++) {
                orderedTasks[i].calculateTime(this.start);
            }
        };

        /**
        *
        * @returns {Util.HashSet}
        */
        Project.prototype.calculateAllCriticalCosts = function () {
            var remaining = this.collectAllTasks();
            var completed = new HashSet();
            try  {
                while (remaining.length() != 0) {
                    var progress = false;
                    remaining.each(function (schedulable) {
                        var dependencies = schedulable.getDependencies();
                        var containsAll = true;
                        for (var i = 0; i < dependencies.length; i++) {
                            var sch = dependencies[i].task;
                            if (!completed.contains(sch))
                                containsAll = false;
                        }
                        if (containsAll) {
                            remaining.remove(schedulable);
                            schedulable.calculateCriticalCost(dependencies);
                            progress = true;
                            completed.put(schedulable);
                            return true;
                        }
                        if (!progress) {
                            throw ("Cyclic dependency, algorithm stopped!");
                        }
                    });
                }
            } catch (err) {
                alert("Error: " + err);
                throw err;
            }
            return completed;
        };

        /**
        *
        * @returns {Util.HashSet}
        */
        Project.prototype.collectAllTasks = function () {
            var result = new HashSet();
            for (var i = 0; i < this.tasks.length; i++) {
                result.putAll(this.tasks[i].getSubTasks());
            }
            return result;
        };
        return Project;
    })();
    Model.Project = Project;
})(Model || (Model = {}));
//# sourceMappingURL=Project.js.map

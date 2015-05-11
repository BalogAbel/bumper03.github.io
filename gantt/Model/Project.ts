///<reference path='../../references.ts'/>

module Model {
    import Schedulable = Model.Schedulable;
    import Task = Model.Task;
    import Summary = Model.Summary;
    import Scheduler = Model.Schedulers.Scheduler;
    import LeastSlackTimeScheduler = Model.Schedulers.LeastSlackTimeScheduler;
    import WorkingCalendar = Model.WorkingCalendar.WorkingCalendar;
    import HashSet = Util.HashSet;

    /**
     *
     */
    export class Project implements Util.ISerializable<Project> {

        start:Date;
        finish:Date;
        earliestFinish:Date;
        tasks:Task[];
        workingCalendar:WorkingCalendar;
        scheduler:Scheduler;

        constructor() {
            this.tasks = [];
            this.start = new Date();
            this.start.setHours(0, 0, 0, 0);
            this.scheduler = new LeastSlackTimeScheduler();
            this.workingCalendar = WorkingCalendar.getWorkingCalendar();
        }
        /**
         *
         */
        schedule() {
            var that = this;

            for (var i:number = 0; i < this.tasks.length; i++) {
                this.tasks[i].reset();
            }
            var tasks = this.collectAllTasks();
            this.calculateEarliestTimes(tasks);
            this.calculateLatestTimes(tasks);


            this.scheduler.schedule(tasks);

            this.finish = new Date(this.start.getTime());
            this.tasks.forEach(task => {
                if (that.finish.getTime() < task.finish.getTime())
                    that.finish.setTime(task.finish.getTime());
            });
        }

        /**
         *
         * @returns {Util.HashSet}
         */
        private calculateEarliestTimes(tasks:Schedulable[]) {
            this.earliestFinish = new Date(this.start.getTime());
            var remaining = tasks.slice(0);
            var completed:Schedulable[] = [];
            try {
                while (remaining.length != 0) {
                    var progress:boolean = false;
                    for (var i = remaining.length - 1; i >= 0; i--) {
                        var schedulable = remaining[i];
                        var dependencies:Dependency[] = schedulable.getPredecessors();
                        var containsAll:boolean = true;
                        dependencies.forEach(dependency  => {
                            if (completed.indexOf(<Schedulable>dependency.task) == -1) {
                                containsAll = false;
                            }
                        });
                        if (containsAll) {
                            var index = remaining.indexOf(schedulable);
                            if (index > -1) remaining.splice(index, 1);
                            schedulable.calculateCriticalCost(this.start, dependencies);
                            if (this.earliestFinish.getTime() < schedulable.earliestFinish.getTime()) {
                                this.earliestFinish.setTime(schedulable.earliestFinish.getTime());
                            }
                            progress = true;
                            completed.push(schedulable);
                        }
                    }
                    if (!progress) {
                        throw("Cyclic dependency, algorithm stopped!")
                    }
                }
            } catch (err) {
                alert("Error: " + err);
                throw err;
            }
        }


        /**
         *
         * @returns {Util.HashSet}
         */
        private calculateLatestTimes(tasks:Schedulable[]) {
            var endingTasks = this.getEndingTasks(tasks);
            var that = this;
            endingTasks.forEach(task => {
                task.calculateLatest(that.earliestFinish);
            });
        }

        private getEndingTasks(tasks:Schedulable[]):Schedulable[] {
            var result:Schedulable[] = tasks.slice(0);
            tasks.forEach(task => {
                task.getPredecessors().forEach(pred => {
                    var index = result.indexOf(<Schedulable>pred.task);
                    if (index > -1) result.splice(index, 1);
                });
            });
            return result;
        }

        /**
         *
         * @returns {Util.HashSet}
         */
        private collectAllTasks():Schedulable[] {
            var result = new HashSet<Schedulable>();
            for (var i:number = 0; i < this.tasks.length; i++) {
                result.putAll(this.tasks[i].getSubTasks());
            }
            return result.toArray().filter(s => s != undefined);
        }


        deserialize(input: any): Project {
            this.start = input.start != null ? new Date(input.start) : null;
            this.finish = input.finish != null ? new Date(input.finish) : null;
            this.earliestFinish = input.earlearliestFinish;
            for(var i = 0; i < input.tasks.length; i++) {
                this.tasks.push(Task.deserializeHelper(input.tasks[i]))
            }
            this.workingCalendar = new WorkingCalendar().deserialize(input.workingCalendar)
            this.scheduler = Scheduler.deserializeHelper(input.scheduler);
            return this;
        }

        public getAllSummaries(): Summary[] {
            var result: Summary[] = [];
            for (var i:number = 0; i < this.tasks.length; i++) {
                result = result.concat(this.tasks[i].getAllSummaries());
            }
            return result;
        }
        public getAllTasks(): Task[] {
            var result: Task[] = [];
            for (var i:number = 0; i < this.tasks.length; i++) {
                result = result.concat(this.tasks[i].getAllTasks());
            }
            return result;
        }

    }

}
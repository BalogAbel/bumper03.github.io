///<reference path='Task.ts'/>
///<reference path='Schedulable.ts'/>
///<reference path='Summary.ts'/>
///<reference path='../Util/HashSet.ts'/>
///<reference path='WorkingCalendar/WorkingCalendar.ts'/>

module Model {
    import Schedulable = Model.Schedulable;
    import Task = Model.Task;
    import Summary = Model.Summary;
    import WorkingCalendar = Model.WorkingCalendar.WorkingCalendar;
    import HashSet = Util.HashSet;

    /**
     *
     */
    export class Project {

        start: Date;
        tasks: Task[];
        workingCalendar: WorkingCalendar;

        constructor() {
            this.tasks = [];
            this.start = new Date();
            this.start.setHours(0,0,0,0);
        }

        /**
         *
         */
        schedule() {
			for(var i: number = 0; i < this.tasks.length; i++) {
				this.tasks[i].reset();
			}
            var tasks: HashSet<Schedulable> = this.calculateAllCriticalCosts();
            var orderedTasks: Schedulable[] = [];
            tasks.each(function(s: Schedulable): boolean {
                orderedTasks.push(s);
                return true;
            });
            orderedTasks.sort(function(a: Schedulable, b: Schedulable): number {
                return a.criticalCost.equals(b.criticalCost);
            });

            for(var i: number = 0; i < orderedTasks.length; i++) {
                orderedTasks[i].calculateTime(this.start);
            }
        }

        /**
         *
         * @returns {Util.HashSet}
         */
        calculateAllCriticalCosts(): HashSet<Schedulable> {
            var remaining: HashSet<Schedulable> = this.collectAllTasks();
            var completed = new HashSet<Schedulable>();
            try {
                while (remaining.length() != 0) {
                    var progress:boolean = false;
                    remaining.each(function(schedulable: Schedulable): boolean {
                        var dependencies: Dependency[] = schedulable.getDependencies();
                        var containsAll: boolean = true;
                        for(var i: number = 0; i < dependencies.length; i++) {
                            var sch: Schedulable = <Schedulable>dependencies[i].task
                            if(!completed.contains(sch)) containsAll = false;
                        }
                        if (containsAll) {
                            remaining.remove(schedulable);
                            schedulable.calculateCriticalCost(dependencies);
                            progress = true;
                            completed.put(schedulable);
                            return true;
                        }
                        if (!progress) {
                            throw("Cyclic dependency, algorithm stopped!")
                        }
                    });
                }
            } catch(err) {
                alert("Error: " + err);
                throw err;
            }
            return completed;
        }

        /**
         *
         * @returns {Util.HashSet}
         */
        collectAllTasks():HashSet<Schedulable> {
            var result = new HashSet<Schedulable>();
            for (var i:number = 0; i < this.tasks.length; i++) {
                result.putAll(this.tasks[i].getSubTasks());
            }
            return result;


        }

    }
}
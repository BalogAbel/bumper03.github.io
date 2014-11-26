///<reference path='Task.ts'/>
///<reference path='Dependency.ts'/>
///<reference path='../Util/HashSet.ts'/>
///<reference path='WorkingCalendar/WorkingCalendar.ts'/>
///<reference path='WorkingCalendar/Duration.ts'/>

module Model {
    import WorkingCalendar = Model.WorkingCalendar.WorkingCalendar;
    import Duration = Model.WorkingCalendar.Duration;
    import Task = Model.Task;
    import Dependency = Model.Dependency;
    import HashSet = Util.HashSet;

    export class Schedulable extends Task {
        duration: Duration;
        criticalCost: Duration;

        getSubTasks(): HashSet<Schedulable> {
            var result = new HashSet<Schedulable>();
            result.put(this);
            return result;
        }

        calculateTime(projectStartDate: Date) {
            if (this.criticalCost != null) {

				var workingCalendar = WorkingCalendar.getWorkingCalendar();

                var dependencies: Dependency[] = this.getDependencies();
                var start: Date = new Date(projectStartDate.getTime());
                var defaultStart: Date = new Date(projectStartDate.getTime());
                for(var i: number = 0; i < dependencies.length; i++) {
					var actualDate = new Date(dependencies[i].task.finish.getTime())
                    workingCalendar.add(actualDate, dependencies[i].lag);
                    if(actualDate.getTime() > start.getTime()) start.setTime(actualDate.getTime());
                }
				var earliestStartConstraint: Date = this.getEarliestStartConstraint();
				if(earliestStartConstraint != null && earliestStartConstraint.getTime() > start.getTime()) {
					start.setTime(earliestStartConstraint.getTime());
				}
                workingCalendar.setToWorkingPeriod(start);
                this.start = new Date(start.getTime());
                workingCalendar.add(start, this.duration);
                this.finish = new Date(start.getTime());

                if(this.parent != null) {
                    this.parent.notifyScheduled(this);
                }
            }
        }

        getCriticalCost() {
            return this.criticalCost;
        }

        calculateCriticalCost(dependencies: Dependency[] = null) {
            var criticalCost: Duration = new Duration();
            if(dependencies == null) {
                dependencies = this.getDependencies();
            }

            for(var i: number = 0; i < dependencies.length; i++) {
                if (dependencies[i].getCriticalCost().equals(criticalCost) > 0)
                    criticalCost = dependencies[i].getCriticalCost();
            }
            this.criticalCost = criticalCost.add(this.duration);
        }

    }
}
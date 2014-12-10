///<reference path='WorkingCalendar/Duration.ts'/>
///<reference path='Task.ts'/>
///<reference path='Schedulable.ts'/>
///<reference path='../Util/HashSet.ts'/>
///<reference path='../Util/Hashable.ts'/>

module Model {
    import Task = Model.Task;
    import Schedulable = Model.Schedulable;
    import Duration = Model.WorkingCalendar.Duration;
    import HashSet = Util.HashSet;
    import Hashable = Util.Hashable;

    export class Dependency implements Hashable {

        id: number;
        task: Task;
        lag: Duration;

        constructor() {
            this.lag = new Duration();
        }

        hash(): number {
            return this.id;
        }
    }
}
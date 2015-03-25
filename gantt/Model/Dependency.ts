///<reference path='../../references.ts'/>

module Model {
    import Task = Model.Task;
    import Schedulable = Model.Schedulable;
    import Duration = Model.WorkingCalendar.Duration;
    import HashSet = Util.HashSet;
    import Hashable = Util.Hashable;

    export class Dependency implements Hashable, Util.ISerializable<Dependency> {

        id: number;
        task: Task;
        lag: Duration;

        constructor() {
            this.lag = new Duration();
        }

        hash(): number {
            return this.id;
        }

        deserialize(input: any): Dependency {
            this.id = input.id;
            this.task = Task.deserializeHelper(input.task);
            this.lag = new Duration().deserialize(input.lag);
            return this;
        }
    }
}
import {Hashable} from "../Util/Hashable";
import {ISerializable} from "../Util/Serializer";
import {Task} from "./Task";
import {Duration} from "./WorkingCalendar/Duration";

export class Dependency implements Hashable, ISerializable<Dependency> {

    id:number;
    task:Task;
    lag:Duration;


    constructor()  {
        this.lag = new Duration();
    }

    hash():number {
        return this.id;
    }

    deserialize(input:any):Dependency {
        this.id = input.id;
        this.task = Task.deserializeHelper(input.task);
        this.lag = new Duration().deserialize(input.lag);
        return this;
    }

    getNew():Hashable {
        return new Dependency();
    }
}
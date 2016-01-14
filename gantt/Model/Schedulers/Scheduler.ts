import {ISerializable} from "../../Util/Serializer";
import {Schedulable} from "../Schedulable";
import {ResourceManager} from "./ResourceManager";

export class Scheduler implements ISerializable<Scheduler> {
    public resourceManager:ResourceManager;


    schedule(tasksParam:Schedulable[]) {
        return;
    }


    deserialize(input:any):Scheduler {
        return this;
    }

    static deserializeHelper(input:any):Scheduler {
        if (input.hasOwnProperty('leastSlackTimeScheduler'))
            return new LeastSlackTimeScheduler().deserialize(input);

        throw "Not a scheduler";
    }

}

export class SchedulerHelper {
    static deserialize(scheduler:any):Scheduler {
        if (scheduler.hasOwnProperty('leastSlactTimeScheduler'))
            return new LeastSlackTimeScheduler().deserialize(scheduler);
        throw "Not an scheduler: " + scheduler;
    }
}
import {LeastSlackTimeScheduler} from "./LeastSlackTimeScheduler";
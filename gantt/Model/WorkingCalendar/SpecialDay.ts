import {WorkingDay} from "./WorkingDay";
import {Hashable} from "../../Util/Hashable";
import {IntervalList} from "../../Util/IntervalList/IntervalList";
import {WorkingHour} from "./WorkingHour";
export class SpecialDay implements Hashable{
    public date: Date;
    public workingDay: WorkingDay;

    constructor(date:Date = null, workingDay:WorkingDay = new WorkingDay()) {
        this.date = date;
        this.workingDay = workingDay;
    }

    hash():number {
        return Math.floor(this.date.getTime() /1000 / 60 / 60 / 24);
    }

    static hash(date: Date): number {
        return Math.floor(date.getTime() /1000 / 60 / 60 / 24);
    }


    deserialize(input:any):Hashable {
        this.date = new Date(input.date);
        this.workingDay = new WorkingDay().deserialize(input.workingDay);
        return this;
    }

    getNew():Hashable {
        return new SpecialDay();
    }

}
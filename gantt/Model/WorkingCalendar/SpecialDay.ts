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
        return SpecialDay.hash(this.date);
    }

    static hash(date: Date): number {
        return date.getDate() + 100 * date.getMonth() + 10000 * date.getFullYear();
    }


    deserialize(input:any):SpecialDay {
        if (!input.hasOwnProperty('date')) return input;
        this.date = new Date(input.date);
        this.workingDay = new WorkingDay().deserialize(input.workingDay);
        return this;
    }

    getNew():SpecialDay {
        return new SpecialDay();
    }

}
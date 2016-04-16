import {WorkingDay} from "./WorkingDay";
import {Hashable} from "../../Util/Hashable";
export class SpecialDay implements Hashable{
    public date: Date;
    public workingDay: WorkingDay;


    constructor(date:Date, workingDay:WorkingDay) {
        this.date = date;
        this.workingDay = workingDay;
    }

    hash():number {
        return Math.floor(this.date.getTime() /1000 / 60 / 60 / 24);
    }

    static hash(date: Date): number {
        return Math.floor(date.getTime() /1000 / 60 / 60 / 24);
    }

}
import {ISerializable} from "../../Util/Serializer";
import {WorkingDay} from "./WorkingDay";
import {Duration} from "./Duration";
import {SpecialDaysList} from "./SpecialDaysList";
import {WorkingHour} from "./WorkingHour";
import {SpecialDay} from "./SpecialDay";

export class WorkingCalendar implements ISerializable<WorkingCalendar> {
    private static _instance:WorkingCalendar = null;

    workingDays:boolean[];
    normalWorkingDay:WorkingDay;
    
    specialDays: SpecialDaysList;


    static getWorkingCalendar():WorkingCalendar {
        if (WorkingCalendar._instance == null) {
            WorkingCalendar._instance = new WorkingCalendar();
        }
        return WorkingCalendar._instance;

    }

    static reset():void {
        WorkingCalendar._instance = new WorkingCalendar();
    }

    constructor() {
        this.workingDays = [, true, true, true, true, true, false, false];
        this.normalWorkingDay = new WorkingDay();
        this.normalWorkingDay.workingHours.push(new WorkingHour(8, 0, 12, 0));
        this.normalWorkingDay.workingHours.push(new WorkingHour(12, 30, 16, 30));
        this.specialDays = new SpecialDaysList();
    }

    add(date:Date, duration:Duration):Date {
        var result = new Date(date.getTime());
        this.addMinutes(result, duration.getCost());
        return result;

    }

    subTract(date:Date, duration:Duration) {
        var result = new Date(date.getTime());
        this.addMinutes(result, duration.getCost(), true);
        return result;

    }


    private addMinutes(date:Date, remainingMinutes:number, backward:boolean = false) {
        while (remainingMinutes != 0) {
            var workingDay = this.getActualWorkingDay(date, backward);
            remainingMinutes = backward
                ? workingDay.subtract(date, remainingMinutes)
                : workingDay.add(date, remainingMinutes);
            if (remainingMinutes != 0) {
                this.setToNextDay(date, backward);
            }
        }
    }

    setToWorkingPeriod(date:Date, backward:boolean = false) {
        if (this.getActualWorkingDay(date, backward).isEnd(date, backward)) {
            this.setToNextDay(date, backward);
        }
        this.getActualWorkingDay(date, backward).setTimeToPeriod(date, backward);

    }

    isWorkingDay(date:Date):boolean {
        return this.workingDays[date.getDay()];
    }


    private getActualWorkingDay(date:Date, backward:boolean = false):WorkingDay {
        var sday = this.specialDays.get(date);
        console.log(date);
        console.log(SpecialDay.hash(date));
        console.log(sday);
        console.log("--------------------------------");
        if(sday != null) return sday.workingDay;
        while (!this.workingDays[date.getDay()]) {
            this.setToNextDay(date, backward);
        }
        return this.normalWorkingDay;
    }

    private setToNextDay(date:Date, backward:boolean = false) {
        if (backward) {
            date.setDate(date.getDate() - 1);
            date.setHours(23, 59, 0, 0);
        } else {
            date.setDate(date.getDate() + 1);
            date.setHours(0, 0, 0, 0);
        }
    }

    deserialize(input:any):WorkingCalendar {
        if (!input.hasOwnProperty('workingDays')) return input;
        this.workingDays = input.workingDays;
        this.normalWorkingDay = new WorkingDay().deserialize(input.normalWorkingDay);
        this.specialDays = new SpecialDaysList().deserialize(input.specialDays);
        WorkingCalendar._instance = this;
        return this;
    }

}
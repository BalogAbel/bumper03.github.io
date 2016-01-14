
import {ISerializable} from "../Serializer";
import {IInterval} from "./IInterval";
import {IntervalOverlapError} from "./IntervalOverlapError";
import {WorkingHour} from "../../Model/WorkingCalendar/WorkingHour";


export class IntervalList<T extends IInterval> implements ISerializable<IntervalList<T>> {
    private intervals:IInterval[];

    constructor() {
        this.intervals = [];
    }


    push(t:T) {
        this.intervals.forEach(element => {
            if (element.doOverLapWith(t)) throw new IntervalOverlapError();
        });

        var i:number;
        for (i = 0; i < this.intervals.length; i++) {
            if (this.intervals[i].compare(t) > 0) break;
        }
        this.intervals.splice(i, 0, t);
    }

    removeLast(t:T) {
        var index:number = this.intervals.lastIndexOf(t);
        this.remove(index);
    }

    remove(index:number) {
        this.intervals.splice(index, 1);
    }

    last():T {
        return <T>this.intervals[this.intervals.length - 1];
    }

    first():T {
        return <T>this.intervals[0];
    }

    each(callback:(t:T) => boolean) {
        for (var prop in this.intervals) {
            if (!callback(<T>this.intervals[prop])) break;
        }
    }

    get(i:number):T {
        return <T>this.intervals[i];
    }

    reverse(callback:(t:T) => boolean) {
        for (var i:number = this.intervals.length - 1; i >= 0; i--) {
            if (!callback(<T>this.intervals[i])) break;
        }

    }

    deserialize(input:any):IntervalList<T> {
        for (var i = 0; i < input.intervals.length; i++) {
            this.intervals.push(this.deserializeHelper(input.intervals[i]))
        }
        return this;
    }

    deserializeHelper(interval:any):IInterval {
        if (interval.hasOwnProperty('fromHour')) {
            var ret = <IInterval>(new WorkingHour(0, 0, 0, 1).deserialize(interval));
            return ret;
        }
        throw "Not an interval: " + interval;
    }

    length():number {
        return this.intervals.length;
    }

}
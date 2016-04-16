import {HashSet} from "../../Util/HashSet";
import {WorkingDay} from "./WorkingDay";
import {SpecialDay} from "./SpecialDay";
import {ISerializable} from "../../Util/Serializer";
import {WorkingHour} from "./WorkingHour";
import {IntervalList} from "../../Util/IntervalList/IntervalList";
import {resizeable} from "../../../components/Resizeable";
export class SpecialDaysList implements ISerializable<SpecialDaysList> {

    public specialDays:HashSet<SpecialDay>;

    constructor() {
        this.specialDays = new HashSet<SpecialDay>()
    }

    add(date:Date, day:WorkingDay) {
        this.specialDays.put(new SpecialDay(date, day));
    }

    get(date:Date):SpecialDay {
        return this.specialDays.get(SpecialDay.hash(date));
    }

    deleteByDate(date:Date) {
        this.specialDays.removeByHash(SpecialDay.hash(date));
    }

    delete(specialDay:SpecialDay) {
        this.specialDays.remove(specialDay);
    }

    getDaysOrdered():SpecialDay[] {
        var result:SpecialDay[] = [];
        this.specialDays.toArray().forEach(a => result.push(a));
        return result.sort((a, b) => a.hash() - b.hash());

        // return result;
    }

    deserialize(input:any):SpecialDaysList {
        this.specialDays = new HashSet<SpecialDay>();
        
        return this;
    }
}
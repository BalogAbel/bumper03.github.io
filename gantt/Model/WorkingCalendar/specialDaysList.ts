import {HashSet} from "../../Util/HashSet";
import {SpecialDay} from "./SpecialDay";
import {ISerializable} from "../../Util/Serializer";
export class SpecialDaysList implements ISerializable<SpecialDaysList> {

    public specialDays:HashSet<SpecialDay>;

    constructor() {
        this.specialDays = new HashSet<SpecialDay>()
    }

    add(specialDay:SpecialDay) {
        this.specialDays.put(specialDay);
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
        if (!input.hasOwnProperty('specialDays')) return input;
        this.specialDays = new HashSet<SpecialDay>();
        this.specialDays.deserialize(input.specialDays, new SpecialDay());
        return this;
    }
}
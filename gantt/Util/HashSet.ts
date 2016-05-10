import {} from 'Hashable'
import {Hashable} from "./Hashable"

export class HashSet<T extends Hashable> {
    private set:any;
    private _length:number;

    constructor() {
        this._length = 0;
        this.set = {};
    }

    put(t:T) {
        if (!this.contains(t)) this._length++;
        this.set['hash.'+t.hash()] = t;
    }

    putAll(hashSet:HashSet<T>) {
        var that:HashSet<T> = this;
        hashSet.each(function (t:T):boolean {
            that.put(t);
            return true;
        });
    }

    get(hash: number): T {
        return this.set["hash." + hash];
    }

    clear() {
        this._length = 0;
        this.set = [];
    }

    remove(t:T) {
        delete this.set['hash.'+t.hash()];
        this._length--;
    }

    removeByHash(hash:number) {
        delete this.set['hash.'+hash];
        this._length--;
    }

    contains(t:T):boolean {
        return ('hash.'+t.hash()) in this.set;
    }

    containsAll(hashSet:HashSet<T>) {
        var that:HashSet<T> = this;
        var result:boolean = true;
        hashSet.each(function (t:T):boolean {
            result = that.contains(t);
            return result;
        });
        return result;
    }

    each(callback:(t:T) => boolean) {
        for (var prop in this.set) {
            if (!callback(this.set[prop])) break;
        }
    }

    length():number {
        return this._length;
    }

    toArray():T[] {
        var result:T[] = [];
        this.each(function (t:T):boolean {
            result.push(t);
            return true;
        });
        return result;
    }

    public deserialize(input: any, inst: T): HashSet<T> {
        this.set = {};
        this._length = input._length;
        for (var prop in input.set) {
            var item = inst.getNew().deserialize(input.set[prop]);
            this.set["hash."+item.hash()] = item;
        }
        return this;
    }


}
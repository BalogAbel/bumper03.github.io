///<reference path='../../references.ts'/>

module Util {
    import Hashable = Util.Hashable;

    export class HashSet<T extends Hashable> {
        private set: T[];
        private _length: number;

        constructor() {
            this._length = 0;
            this.set = [];
        }

        put(t: T) {
            if(!this.contains(t)) this._length++;
            this.set[t.hash()] = t;
        }

        putAll(hashSet: HashSet<T> ) {
            var that:HashSet<T> = this;
            hashSet.each(function(t:T): boolean {
                that.put(t);
                return true;
            });
        }

        clear() {
            this._length = 0;
            this.set = [];
        }

        remove(t:T) {
            delete this.set[t.hash()];
            this._length--;
        }

        contains(t:T): boolean {
            return t.hash() in this.set;
        }

        containsAll(hashSet: HashSet<T>) {
            var that:HashSet<T> = this;
            var result:boolean = true;
            hashSet.each(function(t:T): boolean {
                result = that.contains(t);
                return result;
            });
            return result;
        }

        each(callback: (t: T) => boolean) {
            for(var prop in this.set) {
                if(!callback(this.set[prop])) break;
            }
        }

        length(): number {
            return this._length;
        }

		toArray(): T[] {
			return this.set;
		}


    }
}
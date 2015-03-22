///<reference path='../../../../references.ts'/>

module Util.IntervalList {
	import IInterval = Util.IntervalList.IInterval;
	import IntervalOverlapError = Util.IntervalList.IntervalOverlapError;
	export class IntervalList<T extends IInterval> {
		private intervals: T[];

		constructor() {
			this.intervals = [];
		}


		push(t: T) {
			this.intervals.forEach(function(element) {
				if(element.doOverLapWith(t)) throw new IntervalOverlapError();
			});

			var i: number;
			for(i = 0; i < this.intervals.length; i++) {
				if(this.intervals[i].compare(t) > 0) break;
			}
			this.intervals.splice(i, 0, t);
		}

		removeLast(t: T) {
			var index: number = this.intervals.lastIndexOf(t);
			this.remove(index);
		}

		remove(index: number) {
			this.intervals.splice(index, 1);
		}

		last(): T {
			return this.intervals[this.intervals.length - 1];
		}

		first(): T {
			return this.intervals[0];
		}

		each(callback: (t: T) => boolean) {
			for(var prop in this.intervals) {
				if(!callback(this.intervals[prop])) break;
			}
		}

		reverse(callback: (t: T) => boolean) {
			for(var i: number = this.intervals.length - 1; i >= 0; i--) {
				if(!callback(this.intervals[i])) break;
			}

		}
	}
}
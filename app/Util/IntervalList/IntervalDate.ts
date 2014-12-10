///<reference path='IInterval.ts'/>
///<reference path='IntervalBoundariesError.ts'/>

module Util.IntervalList {
	import IInterval = Util.IntervalList.IInterval;
	import IntervalBoundariesError = Util.IntervalList.IntervalBoundariesError;

	export class IntervalDate implements IInterval {

		from: Date;
		to: Date;

		constructor(from: Date, to: Date) {
			this.from = new Date(from.getTime());
			this.to = new Date(to.getTime());
			if(this.from.getTime() > this.to.getTime()) throw new IntervalBoundariesError();
		}

		compare(t: any): number {
			if(!(t instanceof IntervalDate)) throw TypeError();
			var other = <IntervalDate>t;
			return this.from.getTime() - other.from.getTime();
		}


		doOverLapWith(t: any): boolean {
			if(!(t instanceof IntervalDate)) throw TypeError();
			var other = <IntervalDate>t;
			return !(this.to.getTime() <= other.from.getTime()) || (this.from.getTime() >= other.to.getTime());
		}


	}
}
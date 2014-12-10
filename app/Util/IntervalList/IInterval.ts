///<reference path='../IComparable.ts'/>

module Util.IntervalList {
	import IComparable = Util.IComparable;
	export interface IInterval extends IComparable {
		doOverLapWith(t: any): boolean;
	}
}
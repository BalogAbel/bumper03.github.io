///<reference path='../../../references.ts'/>

module Model.WorkingCalendar {
	import IComparable = Util.IComparable;
	import IInterval = Util.IntervalList.IInterval;
	import IntervalBoundariesError = Util.IntervalList.IntervalBoundariesError

	export class WorkingHour implements IComparable, IInterval {
		fromHour: number;
		fromMinute: number;
		toHour: number;
		toMinute: number;

		constructor(fromHour: number, fromMinute: number, toHour: number, toMinute: number) {
			var newFromValue = fromHour * 100 + fromMinute;
			var newToValue = toHour * 100 + toMinute;
			if(newFromValue >= newToValue) throw new IntervalBoundariesError();
			this.fromHour = fromHour;
			this.toHour = toHour;
			this.fromMinute = toMinute;
			this.toMinute = toMinute;
		}

		compare(t: any): number {
			if(!(t instanceof WorkingHour)) throw TypeError();
			var other = <WorkingHour>t;
			return this.getFromValue() - other.getFromValue();
		}

		doOverLapWith(t: any): boolean {
			if(!(t instanceof WorkingHour)) throw TypeError();
			var other = <WorkingHour>t;
			return !(this.getToValue() < other.getFromValue()) || (this.getFromValue() > other.getToValue());
		}

		private getFromValue() {
			return this.fromHour * 100 + this.fromMinute
		}

		private getToValue() {
			return this.toHour * 100 + this.toMinute;
		}

		add(date: Date, remainingMinutes: number): number {
			if(date.getHours() < this.fromHour || (date.getHours() == this.fromHour && date.getMinutes() < this.fromMinute)) {
				date.setHours(this.fromHour, this.fromMinute, 0, 0);
			}
			var availableMinutes = this.toHour * 60 + this.toMinute - date.getHours() * 60 - date.getMinutes();
			if(availableMinutes < 0) return remainingMinutes;
			if(availableMinutes < remainingMinutes) {
				date.setMinutes(date.getMinutes() + availableMinutes);
				return remainingMinutes - availableMinutes;
			} else {
				date.setMinutes(date.getMinutes() + remainingMinutes);
				return 0;
			}
		}

		subtract(date: Date, remainingMinutes: number): number {
			if(date.getHours() > this.toHour || (date.getHours() == this.toHour && date.getMinutes() > this.toMinute)) {
				date.setHours(this.toHour, this.toMinute, 0, 0);
			}
			var availableMinutes = date.getHours() * 60 + date.getMinutes() - this.fromHour * 60 - this.fromMinute;
			if(availableMinutes < 0) return remainingMinutes;
			if(availableMinutes < remainingMinutes) {
				date.setMinutes(date.getMinutes() - availableMinutes);
				return remainingMinutes - availableMinutes;
			} else {
				date.setMinutes(date.getMinutes() - remainingMinutes);
				return 0;
			}
		}

		contains(hour: number, minute: number, backward: boolean = false): number {
			if(backward) {
				minute--;
				if(minute == -1) {
					hour--;
					minute = 59;
				}
			} else {
				minute++;
				if(minute == 60) {
					hour++;
					minute = 0;
				}
			}
			//if its before return -1
			if(hour < this.fromHour || (hour == this.fromHour && minute < this.fromMinute)) {
				return -1;
			}
			//if it's after  return 1
			if(hour > this.toHour || (hour == this.toHour && minute > this.toMinute)) {
				return 1;
			}
			//if non of the above, then it have to contain
			return 0;
		}
	}
}
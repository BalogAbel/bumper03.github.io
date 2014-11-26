///<reference path='../../Util/IInterval.ts'/>
///<reference path='../../Util/IComparable.ts'/>
///<reference path='IntervalBounderiesError.ts'/>

module Model.WorkingCalendar {
    import IComparable = Util.IComparable;
    import IInterval = Util.IInterval;
    import IntervalBounderiesError = Model.WorkingCalendar.IntervalBounderiesError;

    export class WorkingHour implements IComparable, IInterval {
        fromHour: number;
        fromMinute: number;
        toHour: number;
        toMinute: number;

        constructor(fromHour: number, fromMinute: number, toHour: number, toMinute: number) {
            var newFromValue = fromHour * 100 + fromMinute;
            var newToValue = toHour * 100 + toMinute;
            if(newFromValue >= newToValue) throw new IntervalBounderiesError();
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
            if(availableMinutes < remainingMinutes) {
                date.setMinutes(date.getMinutes() + availableMinutes);
                return remainingMinutes - availableMinutes;
            } else {
                date.setMinutes(date.getMinutes() + remainingMinutes);
                return 0;
            }
        }

        contains(hour: number, minute: number): number {
            //if its before return -1
            if(hour < this.fromHour || (hour == this.fromHour && minute < this.fromMinute)) {
                return -1;
            }
            //if it's after (or on the end of the period) return 1
            if(hour > this.toHour || (hour == this.toHour && minute >= this.toMinute)) {
                return 1;
            }
            //if non of the above, then it have to contain
            return 0;
        }


    }
}
///<reference path='../../../../references.ts'/>

module Model.WorkingCalendar {
    export class Duration {

        day: number;
        hour: number;
        minute: number;
        hoursPerDay: number;


        constructor() {
            this.hoursPerDay = 8;
            this.day = 0;
            this.hour = 0;
            this.minute = 0;
        }

        static clone(other: Duration): Duration {
            var result = new Duration();
            result.day = other.day;
            result.hour = other.hour;
            result.minute = other.minute;
            return result;
        }

        add(duration: Duration): Duration {
            var result: Duration = new Duration();
            result.day = this.day + duration.day;
            result.hour = this.hour + duration.hour;
            result.minute = this.minute + duration.minute;
            return result;
        }

        equals(other: Duration): number {
            var cost1: number = this.getCost();
            var cost2: number = other.getCost();
            return cost1 - cost2;
        }

        addToDate(date: Date): Date {
            var result: Date = new Date(date.getTime());
            var time: number = this.getCost();
            result.setTime(result.getTime() + time);
            result.setDate(result.getDate() + this.day);
            return result;
        }

        getCost(): number {
            return (this.day * this.hoursPerDay + this.hour) * 60 + this.minute;
        }


    }
}
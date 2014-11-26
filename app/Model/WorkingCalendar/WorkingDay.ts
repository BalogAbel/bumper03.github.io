///<reference path='WorkingHour.ts'/>
///<reference path='../../Util/IntervalList.ts'/>

module Model.WorkingCalendar {
    import WorkingHour = Model.WorkingCalendar.WorkingHour;
    import IntervalList = Util.IntervalList;
    export class WorkingDay {
        workingHours: IntervalList<WorkingHour>;

        constructor() {
            this.workingHours = new IntervalList<WorkingHour>();
        }

        add(date: Date, remainingMinutes: number): number {
            var i: number = 0;
            this.workingHours.each(function(workingHour: WorkingHour): boolean {
                remainingMinutes = workingHour.add(date, remainingMinutes);
                return (remainingMinutes > 0);
            });
            return remainingMinutes;
        }

        isEnd(date: Date): boolean {
            var lastWHour: WorkingHour = this.workingHours.last();
            return ((lastWHour.toHour == date.getHours() && lastWHour.toMinute >= date.getMinutes()) ||
					lastWHour.toHour < date.getHours());
        }

        setTimeToPeriod(date: Date) {
            this.workingHours.each(function(workingHour: WorkingHour): boolean {
                var contains: number = workingHour.contains(date.getHours(), date.getMinutes());
                switch(contains) {
                    //it's before the period
                    case -1:
                        //set to the beginning of the period, and break the iteration
                        date.setHours(workingHour.fromHour, workingHour.fromMinute);
                        return false;
                        break;
                    //it's in the period
                    case 0:
                        //break the iteration
                        return false;
                        break;
                    //it's after the period
                    case 1:
                        //continue the iteration
                        return true;
                        break;
                    default:
                        return true;

                }
            })
        }

    }
}
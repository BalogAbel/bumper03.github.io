///<reference path='../../../references.ts'/>

module Model.Schedulers {

    import IntervalList = Util.IntervalList.IntervalList;
    import IntervalDate = Util.IntervalList.IntervalDate;
    import IntervalOverlapError = Util.IntervalList.IntervalOverlapError;
    import ResourceUsage = Model.Resources.ResourceUsage;
    import Duration = Model.WorkingCalendar.Duration;
    import WorkingCalendar = Model.WorkingCalendar.WorkingCalendar;

    export class ResourceManager {

        private resourceUsage: IntervalList<IntervalDate>[][];

        constructor() {
            this.resourceUsage = [];
        }

        allocateResource(resourceUsage: ResourceUsage, from: Date, duration: Duration): void {
            var resourceTypeUsage = this.resourceUsage[resourceUsage.resource.id];
            if (resourceTypeUsage == null) {
                resourceTypeUsage = [];
                this.resourceUsage[resourceUsage.resource.id] = resourceTypeUsage;
            }
            var newFromDate: Date = null;
            for (var i = 0; i < resourceTypeUsage.length; i++) {
                var intervalList = resourceTypeUsage[i];
                try {
                    //try to push the interval
                    intervalList.push(new IntervalDate(from, WorkingCalendar.getWorkingCalendar().add(from, d)));
                    //no error, we found a good interval for the task's resource
                    return null;
                } catch (err) {
                    //if error and error type is IntervalOverlapError then search an interval, which is good
                    if (err instanceof IntervalOverlapError) {
                        for (var j = 0; j < intervalList.length() - 1; j++) {
                            var gap = intervalList.get(j).to.getTime() - intervalList.get(j + 1).from.getTime();
                            var newLength = WorkingCalendar.getWorkingCalendar().add(intervalList.get(i).to, duration).getTime();
                            if (gap > newLength && (newFromDate == null || newFromDate.getTime() > intervalList.get(j).to.getTime())) {
                                newFromDate = new Date(intervalList.get(j).to.getTime());
                                break;
                            }
                            //start.setTime(interval.to.getTime());
                        }
                        if (newFromDate == null || intervalList.last().to.getTime() < newFromDate.getTime()) {
                            newFromDate = new Date(intervalList.last().to.getTime());
                        }
                    } else {
                        throw err;
                    }
                }
            }
            //if not all available resource has been used
            if (i < resourceType.available) {
                //create a new one
                var intervalList = new IntervalList<IntervalDate>();
                //push our interval to it
                intervalList.push(new IntervalDate(from, WorkingCalendar.getWorkingCalendar().add(from, duration)));
                resourceTypeUsage.push(intervalList);
                return null;
            }

            return newFromDate;

        }
    }
}
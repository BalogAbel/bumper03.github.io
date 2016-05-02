import {IntervalList} from "../../Util/IntervalList/IntervalList";
import {IntervalDate} from "../../Util/IntervalList/IntervalDate";
import {ResourceType} from "../Resources/ResourceType";
import {WorkingCalendar} from "../WorkingCalendar/WorkingCalendar";
import {IntervalOverlapError} from "../../Util/IntervalList/IntervalOverlapError";
import {Schedulable} from "../Schedulable";
import {Duration} from "../WorkingCalendar/Duration";

export class ResourceManager {

    private resourceUsage:IntervalList<IntervalDate>[][];
    private savedResourceUsage:IntervalList<IntervalDate>[][];

    constructor() {
        this.resourceUsage = [];
    }

    private save():void {
        this.savedResourceUsage = angular.copy(this.resourceUsage);
    }

    private revert():void {
        this.resourceUsage = this.savedResourceUsage;
        this.savedResourceUsage = null;
    }

    private getResourceTypeUsage(resourceType:ResourceType):IntervalList<IntervalDate>[] {
        var resourceTypeUsage = this.resourceUsage[resourceType.id];
        if (resourceTypeUsage == null) {
            resourceTypeUsage = [];
            for (var i = 0; i < resourceType.available; i++) {
                resourceTypeUsage.push(new IntervalList<IntervalDate>())
            }
            this.resourceUsage[resourceType.id] = resourceTypeUsage;
        }
        return resourceTypeUsage;
    }

    allocateTask(task:Schedulable, start:Date):Date {
        var failed = true;
        var actStart = new Date(start.getTime());
        this.save();
        while (failed) {
            failed = !task.getResourceUsages().every(resourceUsage => {
                for (var i = 0; i < resourceUsage.need; i++) {
                    var newStart = this.allocateResource(resourceUsage.resource, actStart, task.duration);
                    if (newStart != null) {
                        actStart = newStart;
                        this.revert();
                        this.save();
                        return false;
                    }
                }
                return true;
            });
        }
        return actStart;
    }

    allocateResource(resourceType:ResourceType, from:Date, duration:Duration):Date {
        var resourceTypeUsage = this.getResourceTypeUsage(resourceType);
        var newFromDate:Date = null;
        for (var i = 0; i < resourceTypeUsage.length; i++) {
            var intervalList = resourceTypeUsage[i];
            try {
                //try to push the interval
                intervalList.push(new IntervalDate(from, WorkingCalendar.getWorkingCalendar().add(from, duration)));
                //no error, we found a good interval for the task's resource
                return null;
            } catch (err) {
                //if error is not IntervalOverlapError, than throw it
                if (err instanceof IntervalOverlapError) {
                    //search an interval, which is good
                    for (var j = 0; j < intervalList.length() - 1; j++) {
                        var newFinish = WorkingCalendar.getWorkingCalendar().add(intervalList.get(j).to, duration);
                        if (intervalList.get(j + 1).from.getTime() >= newFinish.getTime() && (newFromDate == null || newFromDate.getTime() > intervalList.get(j).to.getTime())) {
                            newFromDate = new Date(intervalList.get(j).to.getTime());
                        }
                    }
                    if (newFromDate == null || intervalList.last().to.getTime() < newFromDate.getTime()) {
                        newFromDate = new Date(intervalList.last().to.getTime());
                    }
                } else {
                    throw err;
                }
            }
        }

        return newFromDate;
    }
}
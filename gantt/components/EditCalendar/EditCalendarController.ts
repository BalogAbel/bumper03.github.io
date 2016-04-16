import {WorkingCalendar} from "../../Model/WorkingCalendar/WorkingCalendar";
import {WorkingHour} from "../../Model/WorkingCalendar/WorkingHour";
import {WorkingDay} from "../../Model/WorkingCalendar/WorkingDay";
import {IntervalList} from "../../Util/IntervalList/IntervalList";
import {SpecialDay} from "../../Model/WorkingCalendar/SpecialDay";
export class EditCalendarController {

    workingDay:WorkingDay = null;
    workingDayDate:Date = null;

    private normalOpen = -1;
    private newOpen = -1;
    new:boolean;

    constructor(private $mdDialog:ng.material.IDialogService, private workingCalendar:WorkingCalendar) {
    }

    deleteNormalWorkingHour(workingHour:WorkingHour) {
        this.workingCalendar.normalWorkingDay.workingHours.removeLast(workingHour);
    }

    close():void {
        this.$mdDialog.hide();
    }

    addWorkingDay():void {
        this.workingDay = new WorkingDay();
        this.workingDay.workingHours = new IntervalList<WorkingHour>();
    }

    editSpecialDay(specialDay:SpecialDay):void {
        this.workingDayDate = specialDay.date;
        this.workingDay = specialDay.workingDay;
    }

    saveWorkingDay():void {
        this.workingCalendar.specialDays.add(this.workingDayDate, this.workingDay);
    }

    undoWorkingDay():void {
        this.workingDay = null;
        this.workingDayDate = null;
    }

    addWorkingHour():void {
        var lastWH = this.workingDay.workingHours.last();
        var lastHour = lastWH == null ? 8 : (lastWH.toHour + 1);
        this.workingDay.workingHours.push(new WorkingHour(lastHour, 0, lastHour > 23 ? 24 : (lastHour + 1), 0));
    }


}
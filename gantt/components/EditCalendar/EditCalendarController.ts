import {WorkingCalendar} from "../../Model/WorkingCalendar/WorkingCalendar";
import {WorkingHour} from "../../Model/WorkingCalendar/WorkingHour";
import {WorkingDay} from "../../Model/WorkingCalendar/WorkingDay";
import {IntervalList} from "../../Util/IntervalList/IntervalList";
import {SpecialDay} from "../../Model/WorkingCalendar/SpecialDay";
export class EditCalendarController {
    specialDay: SpecialDay = null;

    normalOpen = -1;
    newOpen = -1;
    newWorkingDay:boolean;

    date: Date = null;

    constructor(private $mdDialog:ng.material.IDialogService, private workingCalendar:WorkingCalendar) {
    }

    deleteNormalWorkingHour(workingHour:WorkingHour) {
        this.workingCalendar.normalWorkingDay.workingHours.removeLast(workingHour);
    }

    addNormalWorkingHour() {
        var lastWH = this.workingCalendar.normalWorkingDay.workingHours.last();
        var lastHour = lastWH == null ? 8 : (lastWH.toHour + 1);
        this.workingCalendar.normalWorkingDay.workingHours.push(new WorkingHour(lastHour, 0, lastHour > 23 ? 24 : (lastHour + 1), 0));
    }

    close():void {
        this.$mdDialog.hide();
    }

    addWorkingDay():void {
        this.specialDay = new SpecialDay();
        this.newWorkingDay = true;
    }

    editSpecialDay(specialDay:SpecialDay):void {
        this.specialDay = specialDay;
        this.date = new Date(this.specialDay.date.getTime());
        this.newWorkingDay = false;
    }

    saveWorkingDay():void {
        if(!this.newWorkingDay) {
            this.workingCalendar.specialDays.deleteByDate(this.date);
        }
        this.workingCalendar.specialDays.add(this.specialDay);
        console.log(SpecialDay.hash( this.specialDay.date));
        console.log(this.workingCalendar.specialDays);
        console.log(this.workingCalendar.specialDays.get(this.specialDay.date));
        this.specialDay = null;

    }

    addWorkingHour():void {
        var lastWH = this.specialDay.workingDay.workingHours.last();
        var lastHour = lastWH == null ? 8 : (lastWH.toHour + 1);
        this.specialDay.workingDay.workingHours.push(new WorkingHour(lastHour, 0, lastHour > 23 ? 24 : (lastHour + 1), 0));
    }

    deleteWorkingHour(workingHour:WorkingHour) {
        this.specialDay.workingDay.workingHours.removeLast(workingHour);
    }

    deleteSpecialDay(specialDay:SpecialDay):void {
        this.workingCalendar.specialDays.delete(specialDay);
    }



}
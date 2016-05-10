"use strict";
var WorkingHour_1 = require("../../Model/WorkingCalendar/WorkingHour");
var SpecialDay_1 = require("../../Model/WorkingCalendar/SpecialDay");
var EditCalendarController = (function () {
    function EditCalendarController($mdDialog, workingCalendar) {
        this.$mdDialog = $mdDialog;
        this.workingCalendar = workingCalendar;
        this.specialDay = null;
        this.normalOpen = -1;
        this.newOpen = -1;
        this.date = null;
    }
    EditCalendarController.prototype.deleteNormalWorkingHour = function (workingHour) {
        this.workingCalendar.normalWorkingDay.workingHours.removeLast(workingHour);
    };
    EditCalendarController.prototype.addNormalWorkingHour = function () {
        var lastWH = this.workingCalendar.normalWorkingDay.workingHours.last();
        var lastHour = lastWH == null ? 8 : (lastWH.toHour + 1);
        this.workingCalendar.normalWorkingDay.workingHours.push(new WorkingHour_1.WorkingHour(lastHour, 0, lastHour > 23 ? 24 : (lastHour + 1), 0));
    };
    EditCalendarController.prototype.close = function () {
        this.$mdDialog.hide();
    };
    EditCalendarController.prototype.addWorkingDay = function () {
        this.specialDay = new SpecialDay_1.SpecialDay();
        this.newWorkingDay = true;
    };
    EditCalendarController.prototype.editSpecialDay = function (specialDay) {
        this.specialDay = specialDay;
        this.date = new Date(this.specialDay.date.getTime());
        this.newWorkingDay = false;
    };
    EditCalendarController.prototype.saveWorkingDay = function () {
        if (!this.newWorkingDay) {
            this.workingCalendar.specialDays.deleteByDate(this.date);
        }
        this.workingCalendar.specialDays.add(this.specialDay);
        console.log(SpecialDay_1.SpecialDay.hash(this.specialDay.date));
        console.log(this.workingCalendar.specialDays);
        console.log(this.workingCalendar.specialDays.get(this.specialDay.date));
        this.specialDay = null;
    };
    EditCalendarController.prototype.addWorkingHour = function () {
        var lastWH = this.specialDay.workingDay.workingHours.last();
        var lastHour = lastWH == null ? 8 : (lastWH.toHour + 1);
        this.specialDay.workingDay.workingHours.push(new WorkingHour_1.WorkingHour(lastHour, 0, lastHour > 23 ? 24 : (lastHour + 1), 0));
    };
    EditCalendarController.prototype.deleteWorkingHour = function (workingHour) {
        this.specialDay.workingDay.workingHours.removeLast(workingHour);
    };
    EditCalendarController.prototype.deleteSpecialDay = function (specialDay) {
        this.workingCalendar.specialDays.delete(specialDay);
    };
    return EditCalendarController;
}());
exports.EditCalendarController = EditCalendarController;
//# sourceMappingURL=EditCalendarController.js.map
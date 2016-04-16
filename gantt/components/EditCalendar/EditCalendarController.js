"use strict";
var WorkingHour_1 = require("../../Model/WorkingCalendar/WorkingHour");
var WorkingDay_1 = require("../../Model/WorkingCalendar/WorkingDay");
var IntervalList_1 = require("../../Util/IntervalList/IntervalList");
var EditCalendarController = (function () {
    function EditCalendarController($mdDialog, workingCalendar) {
        this.$mdDialog = $mdDialog;
        this.workingCalendar = workingCalendar;
        this.workingDay = null;
        this.workingDayDate = null;
        this.normalOpen = -1;
        this.newOpen = -1;
    }
    EditCalendarController.prototype.deleteNormalWorkingHour = function (workingHour) {
        this.workingCalendar.normalWorkingDay.workingHours.removeLast(workingHour);
    };
    EditCalendarController.prototype.close = function () {
        this.$mdDialog.hide();
    };
    EditCalendarController.prototype.addWorkingDay = function () {
        this.workingDay = new WorkingDay_1.WorkingDay();
        this.workingDay.workingHours = new IntervalList_1.IntervalList();
    };
    EditCalendarController.prototype.editSpecialDay = function (specialDay) {
        this.workingDayDate = specialDay.date;
        this.workingDay = specialDay.workingDay;
    };
    EditCalendarController.prototype.saveWorkingDay = function () {
        this.workingCalendar.specialDays.add(this.workingDayDate, this.workingDay);
    };
    EditCalendarController.prototype.undoWorkingDay = function () {
        this.workingDay = null;
        this.workingDayDate = null;
    };
    EditCalendarController.prototype.addWorkingHour = function () {
        var lastWH = this.workingDay.workingHours.last();
        var lastHour = lastWH == null ? 8 : (lastWH.toHour + 1);
        this.workingDay.workingHours.push(new WorkingHour_1.WorkingHour(lastHour, 0, lastHour > 23 ? 24 : (lastHour + 1), 0));
    };
    return EditCalendarController;
}());
exports.EditCalendarController = EditCalendarController;
//# sourceMappingURL=EditCalendarController.js.map
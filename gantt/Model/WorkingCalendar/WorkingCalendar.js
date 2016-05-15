"use strict";
var WorkingDay_1 = require("./WorkingDay");
var SpecialDaysList_1 = require("./SpecialDaysList");
var WorkingHour_1 = require("./WorkingHour");
var WorkingCalendar = (function () {
    function WorkingCalendar() {
        this.workingDays = [, true, true, true, true, true, false, false];
        this.normalWorkingDay = new WorkingDay_1.WorkingDay();
        this.normalWorkingDay.workingHours.push(new WorkingHour_1.WorkingHour(8, 0, 12, 0));
        this.normalWorkingDay.workingHours.push(new WorkingHour_1.WorkingHour(12, 30, 16, 30));
        this.specialDays = new SpecialDaysList_1.SpecialDaysList();
    }
    WorkingCalendar.getWorkingCalendar = function () {
        if (WorkingCalendar._instance == null) {
            WorkingCalendar._instance = new WorkingCalendar();
        }
        return WorkingCalendar._instance;
    };
    WorkingCalendar.reset = function () {
        WorkingCalendar._instance = new WorkingCalendar();
    };
    WorkingCalendar.prototype.add = function (date, duration) {
        var result = new Date(date.getTime());
        this.addMinutes(result, duration.getCost());
        return result;
    };
    WorkingCalendar.prototype.subTract = function (date, duration) {
        var result = new Date(date.getTime());
        this.addMinutes(result, duration.getCost(), true);
        return result;
    };
    WorkingCalendar.prototype.addMinutes = function (date, remainingMinutes, backward) {
        if (backward === void 0) { backward = false; }
        while (remainingMinutes != 0) {
            var workingDay = this.getActualWorkingDay(date, backward);
            remainingMinutes = backward
                ? workingDay.subtract(date, remainingMinutes)
                : workingDay.add(date, remainingMinutes);
            if (remainingMinutes != 0) {
                this.setToNextDay(date, backward);
            }
        }
    };
    WorkingCalendar.prototype.setToWorkingPeriod = function (date, backward) {
        if (backward === void 0) { backward = false; }
        if (this.getActualWorkingDay(date, backward).isEnd(date, backward)) {
            this.setToNextDay(date, backward);
        }
        this.getActualWorkingDay(date, backward).setTimeToPeriod(date, backward);
    };
    WorkingCalendar.prototype.isWorkingDay = function (date) {
        return this.workingDays[date.getDay()];
    };
    WorkingCalendar.prototype.getActualWorkingDay = function (date, backward) {
        if (backward === void 0) { backward = false; }
        var sday = this.specialDays.get(date);
        if (sday != null)
            return sday.workingDay;
        while (!this.workingDays[date.getDay()]) {
            this.setToNextDay(date, backward);
        }
        return this.normalWorkingDay;
    };
    WorkingCalendar.prototype.setToNextDay = function (date, backward) {
        if (backward === void 0) { backward = false; }
        if (backward) {
            date.setDate(date.getDate() - 1);
            date.setHours(23, 59, 0, 0);
        }
        else {
            date.setDate(date.getDate() + 1);
            date.setHours(0, 0, 0, 0);
        }
    };
    WorkingCalendar.prototype.deserialize = function (input) {
        if (!input.hasOwnProperty('workingDays'))
            return input;
        this.workingDays = input.workingDays;
        this.normalWorkingDay = new WorkingDay_1.WorkingDay().deserialize(input.normalWorkingDay);
        this.specialDays = new SpecialDaysList_1.SpecialDaysList().deserialize(input.specialDays);
        WorkingCalendar._instance = this;
        return this;
    };
    WorkingCalendar._instance = null;
    return WorkingCalendar;
}());
exports.WorkingCalendar = WorkingCalendar;
//# sourceMappingURL=WorkingCalendar.js.map
"use strict";
var WorkingDay_1 = require("./WorkingDay");
var SpecialDay = (function () {
    function SpecialDay(date, workingDay) {
        if (date === void 0) { date = null; }
        if (workingDay === void 0) { workingDay = new WorkingDay_1.WorkingDay(); }
        this.date = date;
        this.workingDay = workingDay;
    }
    SpecialDay.prototype.hash = function () {
        return Math.floor(this.date.getTime() / 1000 / 60 / 60 / 24);
    };
    SpecialDay.hash = function (date) {
        return Math.floor(date.getTime() / 1000 / 60 / 60 / 24);
    };
    SpecialDay.prototype.deserialize = function (input) {
        this.date = new Date(input.date);
        this.workingDay = new WorkingDay_1.WorkingDay().deserialize(input.workingDay);
        return this;
    };
    SpecialDay.prototype.getNew = function () {
        return new SpecialDay();
    };
    return SpecialDay;
}());
exports.SpecialDay = SpecialDay;
//# sourceMappingURL=SpecialDay.js.map
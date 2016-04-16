"use strict";
var SpecialDay = (function () {
    function SpecialDay(date, workingDay) {
        this.date = date;
        this.workingDay = workingDay;
    }
    SpecialDay.prototype.hash = function () {
        return Math.floor(this.date.getTime() / 1000 / 60 / 60 / 24);
    };
    SpecialDay.hash = function (date) {
        return Math.floor(date.getTime() / 1000 / 60 / 60 / 24);
    };
    return SpecialDay;
}());
exports.SpecialDay = SpecialDay;
//# sourceMappingURL=SpecialDay.js.map
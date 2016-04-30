"use strict";
var HashSet_1 = require("../../Util/HashSet");
var SpecialDay_1 = require("./SpecialDay");
var SpecialDaysList = (function () {
    function SpecialDaysList() {
        this.specialDays = new HashSet_1.HashSet();
    }
    SpecialDaysList.prototype.add = function (specialDay) {
        this.specialDays.put(specialDay);
    };
    SpecialDaysList.prototype.get = function (date) {
        return this.specialDays.get(SpecialDay_1.SpecialDay.hash(date));
    };
    SpecialDaysList.prototype.deleteByDate = function (date) {
        this.specialDays.removeByHash(SpecialDay_1.SpecialDay.hash(date));
    };
    SpecialDaysList.prototype.delete = function (specialDay) {
        this.specialDays.remove(specialDay);
    };
    SpecialDaysList.prototype.getDaysOrdered = function () {
        var result = [];
        this.specialDays.toArray().forEach(function (a) { return result.push(a); });
        return result.sort(function (a, b) { return a.hash() - b.hash(); });
        // return result;
    };
    SpecialDaysList.prototype.deserialize = function (input) {
        this.specialDays = new HashSet_1.HashSet();
        this.specialDays.deserialize(input.specialDays, new SpecialDay_1.SpecialDay());
        return this;
    };
    return SpecialDaysList;
}());
exports.SpecialDaysList = SpecialDaysList;
//# sourceMappingURL=SpecialDaysList.js.map
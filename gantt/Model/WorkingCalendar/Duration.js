"use strict";
var Duration = (function () {
    function Duration() {
        this.hoursPerDay = 8;
        this.day = 0;
        this.hour = 0;
        this.minute = 0;
    }
    Duration.clone = function (other) {
        var result = new Duration();
        result.day = other.day;
        result.hour = other.hour;
        result.minute = other.minute;
        return result;
    };
    Duration.prototype.add = function (duration) {
        var result = new Duration();
        result.day = this.day + duration.day;
        result.hour = this.hour + duration.hour;
        result.minute = this.minute + duration.minute;
        return result;
    };
    Duration.prototype.equals = function (other) {
        var cost1 = this.getCost();
        var cost2 = other.getCost();
        return cost1 - cost2;
    };
    Duration.prototype.addToDate = function (date) {
        var result = new Date(date.getTime());
        var time = this.getCost();
        result.setTime(result.getTime() + time);
        result.setDate(result.getDate() + this.day);
        return result;
    };
    Duration.prototype.getCost = function () {
        return (this.day * this.hoursPerDay + this.hour) * 60 + this.minute;
    };
    Duration.prototype.deserialize = function (input) {
        this.day = input.day;
        this.hour = input.hour;
        this.minute = input.minute;
        this.hoursPerDay = input.hoursPerDay;
        return this;
    };
    return Duration;
}());
exports.Duration = Duration;
//# sourceMappingURL=Duration.js.map
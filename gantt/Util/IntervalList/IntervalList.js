var IntervalOverlapError_1 = require("./IntervalOverlapError");
var WorkingHour_1 = require("../../Model/WorkingCalendar/WorkingHour");
var IntervalList = (function () {
    function IntervalList() {
        this.intervals = [];
    }
    IntervalList.prototype.push = function (t) {
        this.intervals.forEach(function (element) {
            if (element.doOverLapWith(t))
                throw new IntervalOverlapError_1.IntervalOverlapError();
        });
        var i;
        for (i = 0; i < this.intervals.length; i++) {
            if (this.intervals[i].compare(t) > 0)
                break;
        }
        this.intervals.splice(i, 0, t);
    };
    IntervalList.prototype.removeLast = function (t) {
        var index = this.intervals.lastIndexOf(t);
        this.remove(index);
    };
    IntervalList.prototype.remove = function (index) {
        this.intervals.splice(index, 1);
    };
    IntervalList.prototype.last = function () {
        return this.intervals[this.intervals.length - 1];
    };
    IntervalList.prototype.first = function () {
        return this.intervals[0];
    };
    IntervalList.prototype.each = function (callback) {
        for (var prop in this.intervals) {
            if (!callback(this.intervals[prop]))
                break;
        }
    };
    IntervalList.prototype.get = function (i) {
        return this.intervals[i];
    };
    IntervalList.prototype.reverse = function (callback) {
        for (var i = this.intervals.length - 1; i >= 0; i--) {
            if (!callback(this.intervals[i]))
                break;
        }
    };
    IntervalList.prototype.deserialize = function (input) {
        for (var i = 0; i < input.intervals.length; i++) {
            this.intervals.push(this.deserializeHelper(input.intervals[i]));
        }
        return this;
    };
    IntervalList.prototype.deserializeHelper = function (interval) {
        if (interval.hasOwnProperty('fromHour')) {
            var ret = (new WorkingHour_1.WorkingHour(0, 0, 0, 1).deserialize(interval));
            return ret;
        }
        throw "Not an interval: " + interval;
    };
    IntervalList.prototype.length = function () {
        return this.intervals.length;
    };
    return IntervalList;
})();
exports.IntervalList = IntervalList;
//# sourceMappingURL=IntervalList.js.map
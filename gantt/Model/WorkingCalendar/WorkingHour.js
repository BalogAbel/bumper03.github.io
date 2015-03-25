///<reference path='../../../references.ts'/>
var Model;
(function (Model) {
    var WorkingCalendar;
    (function (WorkingCalendar) {
        var IntervalBoundariesError = Util.IntervalList.IntervalBoundariesError;
        var WorkingHour = (function () {
            function WorkingHour(fromHour, fromMinute, toHour, toMinute) {
                var newFromValue = fromHour * 100 + fromMinute;
                var newToValue = toHour * 100 + toMinute;
                if (newFromValue >= newToValue)
                    throw new IntervalBoundariesError();
                this.fromHour = fromHour;
                this.toHour = toHour;
                this.fromMinute = toMinute;
                this.toMinute = toMinute;
            }
            WorkingHour.prototype.compare = function (t) {
                if (!(t instanceof WorkingHour))
                    throw TypeError();
                var other = t;
                return this.getFromValue() - other.getFromValue();
            };
            WorkingHour.prototype.doOverLapWith = function (t) {
                if (!(t instanceof WorkingHour))
                    throw TypeError();
                var other = t;
                return !(this.getToValue() < other.getFromValue()) || (this.getFromValue() > other.getToValue());
            };
            WorkingHour.prototype.getFromValue = function () {
                return this.fromHour * 100 + this.fromMinute;
            };
            WorkingHour.prototype.getToValue = function () {
                return this.toHour * 100 + this.toMinute;
            };
            WorkingHour.prototype.add = function (date, remainingMinutes) {
                if (date.getHours() < this.fromHour || (date.getHours() == this.fromHour && date.getMinutes() < this.fromMinute)) {
                    date.setHours(this.fromHour, this.fromMinute, 0, 0);
                }
                var availableMinutes = this.toHour * 60 + this.toMinute - date.getHours() * 60 - date.getMinutes();
                if (availableMinutes < 0)
                    return remainingMinutes;
                if (availableMinutes < remainingMinutes) {
                    date.setMinutes(date.getMinutes() + availableMinutes);
                    return remainingMinutes - availableMinutes;
                }
                else {
                    date.setMinutes(date.getMinutes() + remainingMinutes);
                    return 0;
                }
            };
            WorkingHour.prototype.subtract = function (date, remainingMinutes) {
                if (date.getHours() > this.toHour || (date.getHours() == this.toHour && date.getMinutes() > this.toMinute)) {
                    date.setHours(this.toHour, this.toMinute, 0, 0);
                }
                var availableMinutes = date.getHours() * 60 + date.getMinutes() - this.fromHour * 60 - this.fromMinute;
                if (availableMinutes < 0)
                    return remainingMinutes;
                if (availableMinutes < remainingMinutes) {
                    date.setMinutes(date.getMinutes() - availableMinutes);
                    return remainingMinutes - availableMinutes;
                }
                else {
                    date.setMinutes(date.getMinutes() - remainingMinutes);
                    return 0;
                }
            };
            WorkingHour.prototype.contains = function (hour, minute, backward) {
                if (backward === void 0) { backward = false; }
                if (backward) {
                    minute--;
                    if (minute == -1) {
                        hour--;
                        minute = 59;
                    }
                }
                else {
                    minute++;
                    if (minute == 60) {
                        hour++;
                        minute = 0;
                    }
                }
                //if its before return -1
                if (hour < this.fromHour || (hour == this.fromHour && minute < this.fromMinute)) {
                    return -1;
                }
                //if it's after  return 1
                if (hour > this.toHour || (hour == this.toHour && minute > this.toMinute)) {
                    return 1;
                }
                //if non of the above, then it have to contain
                return 0;
            };
            WorkingHour.prototype.deserialize = function (input) {
                this.fromHour = input.fromHour;
                this.fromMinute = input.fromMinute;
                this.toHour = input.toHour;
                this.toMinute = input.toMinute;
                return this;
            };
            return WorkingHour;
        })();
        WorkingCalendar.WorkingHour = WorkingHour;
    })(WorkingCalendar = Model.WorkingCalendar || (Model.WorkingCalendar = {}));
})(Model || (Model = {}));
//# sourceMappingURL=WorkingHour.js.map
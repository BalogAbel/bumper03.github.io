///<reference path='../../Util/IInterval.ts'/>
///<reference path='../../Util/IComparable.ts'/>
///<reference path='IntervalBounderiesError.ts'/>
var Model;
(function (Model) {
    (function (WorkingCalendar) {
        var IntervalBounderiesError = Model.WorkingCalendar.IntervalBounderiesError;

        var WorkingHour = (function () {
            function WorkingHour(fromHour, fromMinute, toHour, toMinute) {
                var newFromValue = fromHour * 100 + fromMinute;
                var newToValue = toHour * 100 + toMinute;
                if (newFromValue >= newToValue)
                    throw new IntervalBounderiesError();
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
                if (availableMinutes < remainingMinutes) {
                    date.setMinutes(date.getMinutes() + availableMinutes);
                    return remainingMinutes - availableMinutes;
                } else {
                    date.setMinutes(date.getMinutes() + remainingMinutes);
                    return 0;
                }
            };

            WorkingHour.prototype.contains = function (hour, minute) {
                //if its before return -1
                if (hour < this.fromHour || (hour == this.fromHour && minute < this.fromMinute)) {
                    return -1;
                }

                //if it's after (or on the end of the period) return 1
                if (hour > this.toHour || (hour == this.toHour && minute >= this.toMinute)) {
                    return 1;
                }

                //if non of the above, then it have to contain
                return 0;
            };
            return WorkingHour;
        })();
        WorkingCalendar.WorkingHour = WorkingHour;
    })(Model.WorkingCalendar || (Model.WorkingCalendar = {}));
    var WorkingCalendar = Model.WorkingCalendar;
})(Model || (Model = {}));
//# sourceMappingURL=WorkingHour.js.map

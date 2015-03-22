///<reference path='../../../references.ts'/>
var Model;
(function (Model) {
    var WorkingCalendar;
    (function (WorkingCalendar) {
        var IntervalList = Util.IntervalList.IntervalList;
        var WorkingDay = (function () {
            function WorkingDay() {
                this.workingHours = new IntervalList();
            }
            WorkingDay.prototype.add = function (date, remainingMinutes) {
                var i = 0;
                this.workingHours.each(function (workingHour) {
                    remainingMinutes = workingHour.add(date, remainingMinutes);
                    return (remainingMinutes > 0);
                });
                return remainingMinutes;
            };
            WorkingDay.prototype.subtract = function (date, remainingMinutes) {
                var i = 0;
                this.workingHours.reverse(function (workingHour) {
                    remainingMinutes = workingHour.subtract(date, remainingMinutes);
                    return (remainingMinutes > 0);
                });
                return remainingMinutes;
            };
            WorkingDay.prototype.isEnd = function (date, backward) {
                if (backward === void 0) { backward = false; }
                if (!backward) {
                    var lastWHour = this.workingHours.last();
                    return ((lastWHour.toHour == date.getHours() && lastWHour.toMinute <= date.getMinutes()) || lastWHour.toHour < date.getHours());
                }
                else {
                    var firstWHour = this.workingHours.first();
                    return ((firstWHour.fromHour == date.getHours() && firstWHour.fromMinute >= date.getMinutes()) || firstWHour.fromHour > date.getHours());
                }
            };
            WorkingDay.prototype.setTimeToPeriod = function (date, backward) {
                if (backward === void 0) { backward = false; }
                if (backward) {
                    this.setTimeToPeriodBackward(date);
                }
                else {
                    this.setTimeToPeriodForward(date);
                }
            };
            WorkingDay.prototype.setTimeToPeriodBackward = function (date) {
                this.workingHours.reverse(function (workingHour) {
                    var contains = workingHour.contains(date.getHours(), date.getMinutes(), true);
                    switch (contains) {
                        case -1:
                            //continue the iteration
                            return true;
                            break;
                        case 0:
                            //break the iteration
                            return false;
                            break;
                        case 1:
                            //set to the end of the period, and break the iteration
                            date.setHours(workingHour.toHour, workingHour.toMinute);
                            return false;
                            break;
                        default:
                            return true;
                    }
                });
            };
            WorkingDay.prototype.setTimeToPeriodForward = function (date) {
                this.workingHours.each(function (workingHour) {
                    var contains = workingHour.contains(date.getHours(), date.getMinutes());
                    switch (contains) {
                        case -1:
                            //set to the beginning of the period, and break the iteration
                            date.setHours(workingHour.fromHour, workingHour.fromMinute);
                            return false;
                            break;
                        case 0:
                            //break the iteration
                            return false;
                            break;
                        case 1:
                            //continue the iteration
                            return true;
                            break;
                        default:
                            return true;
                    }
                });
            };
            return WorkingDay;
        })();
        WorkingCalendar.WorkingDay = WorkingDay;
    })(WorkingCalendar = Model.WorkingCalendar || (Model.WorkingCalendar = {}));
})(Model || (Model = {}));
//# sourceMappingURL=WorkingDay.js.map
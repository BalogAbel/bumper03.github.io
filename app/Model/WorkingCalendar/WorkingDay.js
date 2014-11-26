///<reference path='WorkingHour.ts'/>
///<reference path='../../Util/IntervalList.ts'/>
var Model;
(function (Model) {
    (function (WorkingCalendar) {
        var IntervalList = Util.IntervalList;
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

            WorkingDay.prototype.isEnd = function (date) {
                var lastWHour = this.workingHours.last();
                return ((lastWHour.toHour == date.getHours() && lastWHour.toMinute >= date.getMinutes()) || lastWHour.toHour < date.getHours());
            };

            WorkingDay.prototype.setTimeToPeriod = function (date) {
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
    })(Model.WorkingCalendar || (Model.WorkingCalendar = {}));
    var WorkingCalendar = Model.WorkingCalendar;
})(Model || (Model = {}));
//# sourceMappingURL=WorkingDay.js.map

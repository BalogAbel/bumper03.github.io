///<reference path='Duration.ts'/>
///<reference path='WorkingDay.ts'/>
var Model;
(function (Model) {
    (function (_WorkingCalendar) {
        var WorkingDay = Model.WorkingCalendar.WorkingDay;

        var WorkingCalendar = (function () {
            function WorkingCalendar() {
                this.workingDays = [, true, true, true, true, true, false, false];
                this.normalWorkingDay = new WorkingDay();
            }
            WorkingCalendar.getWorkingCalendar = function () {
                if (WorkingCalendar._instance == null) {
                    WorkingCalendar._instance = new WorkingCalendar();
                }
                return WorkingCalendar._instance;
            };

            WorkingCalendar.prototype.add = function (date, duration) {
                this.addMinutes(date, duration.getCost());
            };

            WorkingCalendar.prototype.addDate = function (date, addDate) {
                this.addMinutes(date, Math.floor(addDate.getTime() / 1000 / 60));
            };

            WorkingCalendar.prototype.addMinutes = function (date, remainingMinutes) {
                while (remainingMinutes != 0) {
                    remainingMinutes = this.getActualWorkingDay(date).add(date, remainingMinutes);
                    if (remainingMinutes != 0) {
                        date.setDate(date.getDate() + 1);
                        date.setHours(0, 0, 0, 0);
                    }
                }
            };

            WorkingCalendar.prototype.setToWorkingPeriod = function (date) {
                if (this.getActualWorkingDay(date).isEnd(date)) {
                    date.setDate(date.getDate() + 1);
                    date.setHours(0, 0, 0, 0);
                }
                this.getActualWorkingDay(date).setTimeToPeriod(date);
            };

            WorkingCalendar.prototype.getActualWorkingDay = function (date) {
                while (!this.workingDays[date.getDay()]) {
                    date.setDate(date.getDate() + 1);
                    date.setHours(0, 0, 0, 0);
                }
                return this.normalWorkingDay;
            };

            WorkingCalendar.prototype.isWorkingDay = function (date) {
                return this.workingDays[date.getDay()];
            };
            WorkingCalendar._instance = null;
            return WorkingCalendar;
        })();
        _WorkingCalendar.WorkingCalendar = WorkingCalendar;
    })(Model.WorkingCalendar || (Model.WorkingCalendar = {}));
    var WorkingCalendar = Model.WorkingCalendar;
})(Model || (Model = {}));
//# sourceMappingURL=WorkingCalendar.js.map

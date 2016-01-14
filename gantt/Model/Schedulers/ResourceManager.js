var IntervalList_1 = require("../../Util/IntervalList/IntervalList");
var IntervalDate_1 = require("../../Util/IntervalList/IntervalDate");
var WorkingCalendar_1 = require("../WorkingCalendar/WorkingCalendar");
var IntervalOverlapError_1 = require("../../Util/IntervalList/IntervalOverlapError");
var ResourceManager = (function () {
    function ResourceManager() {
        this.resourceUsage = [];
    }
    ResourceManager.prototype.save = function () {
        this.savedResourceUsage = angular.copy(this.resourceUsage);
    };
    ResourceManager.prototype.revert = function () {
        this.resourceUsage = this.savedResourceUsage;
        this.savedResourceUsage = null;
    };
    ResourceManager.prototype.getResourceTypeUsage = function (resourceType) {
        var resourceTypeUsage = this.resourceUsage[resourceType.id];
        if (resourceTypeUsage == null) {
            resourceTypeUsage = [];
            for (var i = 0; i < resourceType.available; i++) {
                resourceTypeUsage.push(new IntervalList_1.IntervalList());
            }
            this.resourceUsage[resourceType.id] = resourceTypeUsage;
        }
        return resourceTypeUsage;
    };
    ResourceManager.prototype.allocateTask = function (task, start) {
        var _this = this;
        var failed = true;
        var actStart = new Date(start.getTime());
        this.save();
        while (failed) {
            failed = !task.getResourceUsages().every(function (resourceUsage) {
                for (var i = 0; i < resourceUsage.need; i++) {
                    var newStart = _this.allocateResource(resourceUsage.resource, actStart, task.duration);
                    if (newStart != null) {
                        actStart = newStart;
                        _this.revert();
                        _this.save();
                        return false;
                    }
                }
                return true;
            });
        }
        return actStart;
    };
    ResourceManager.prototype.allocateResource = function (resourceType, from, duration) {
        var resourceTypeUsage = this.getResourceTypeUsage(resourceType);
        var newFromDate = null;
        for (var i = 0; i < resourceTypeUsage.length; i++) {
            var intervalList = resourceTypeUsage[i];
            try {
                //try to push the interval
                intervalList.push(new IntervalDate_1.IntervalDate(from, WorkingCalendar_1.WorkingCalendar.getWorkingCalendar().add(from, duration)));
                //no error, we found a good interval for the task's resource
                return null;
            }
            catch (err) {
                //if error is not IntervalOverlapError, than throw it
                if (err instanceof IntervalOverlapError_1.IntervalOverlapError) {
                    //search an interval, which is good
                    for (var j = 0; j < intervalList.length() - 1; j++) {
                        var newFinish = WorkingCalendar_1.WorkingCalendar.getWorkingCalendar().add(intervalList.get(j).to, duration);
                        if (intervalList.get(j + 1).from.getTime() >= newFinish.getTime() && (newFromDate == null || newFromDate.getTime() > intervalList.get(j).to.getTime())) {
                            newFromDate = new Date(intervalList.get(j).to.getTime());
                        }
                    }
                    if (newFromDate == null || intervalList.last().to.getTime() < newFromDate.getTime()) {
                        newFromDate = new Date(intervalList.last().to.getTime());
                    }
                }
                else {
                    throw err;
                }
            }
        }
        return newFromDate;
    };
    return ResourceManager;
})();
exports.ResourceManager = ResourceManager;
//# sourceMappingURL=ResourceManager.js.map
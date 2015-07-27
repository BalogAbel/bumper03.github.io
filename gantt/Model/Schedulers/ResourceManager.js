///<reference path='../../../references.ts'/>
var Model;
(function (Model) {
    var Schedulers;
    (function (Schedulers) {
        var IntervalList = Util.IntervalList.IntervalList;
        var IntervalDate = Util.IntervalList.IntervalDate;
        var IntervalOverlapError = Util.IntervalList.IntervalOverlapError;
        var WorkingCalendar = Model.WorkingCalendar.WorkingCalendar;
        var ResourceManager = (function () {
            function ResourceManager() {
                this.resourceUsage = [];
            }
            ResourceManager.prototype.allocateResource = function (resourceUsage, from, duration) {
                var resourceTypeUsage = this.resourceUsage[resourceUsage.resource.id];
                if (resourceTypeUsage == null) {
                    resourceTypeUsage = [];
                    this.resourceUsage[resourceUsage.resource.id] = resourceTypeUsage;
                }
                var newFromDate = null;
                for (var i = 0; i < resourceTypeUsage.length; i++) {
                    var intervalList = resourceTypeUsage[i];
                    try {
                        //try to push the interval
                        intervalList.push(new IntervalDate(from, WorkingCalendar.getWorkingCalendar().add(from, d)));
                        //no error, we found a good interval for the task's resource
                        return null;
                    }
                    catch (err) {
                        //if error and error type is IntervalOverlapError then search an interval, which is good
                        if (err instanceof IntervalOverlapError) {
                            for (var j = 0; j < intervalList.length() - 1; j++) {
                                var gap = intervalList.get(j).to.getTime() - intervalList.get(j + 1).from.getTime();
                                var newLength = WorkingCalendar.getWorkingCalendar().add(intervalList.get(i).to, duration).getTime();
                                if (gap > newLength && (newFromDate == null || newFromDate.getTime() > intervalList.get(j).to.getTime())) {
                                    newFromDate = new Date(intervalList.get(j).to.getTime());
                                    break;
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
                //if not all available resource has been used
                if (i < resourceType.available) {
                    //create a new one
                    var intervalList = new IntervalList();
                    //push our interval to it
                    intervalList.push(new IntervalDate(from, WorkingCalendar.getWorkingCalendar().add(from, duration)));
                    resourceTypeUsage.push(intervalList);
                    return null;
                }
                return newFromDate;
            };
            return ResourceManager;
        })();
        Schedulers.ResourceManager = ResourceManager;
    })(Schedulers = Model.Schedulers || (Model.Schedulers = {}));
})(Model || (Model = {}));
//# sourceMappingURL=ResourceManager.js.map
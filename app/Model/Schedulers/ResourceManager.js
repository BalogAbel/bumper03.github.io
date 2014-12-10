///<reference path='../Resources/ResourceType.ts'/>
///<reference path='../../Util/IntervalList/IntervalList.ts'/>
///<reference path='../../Util/IntervalList/IntervalDate.ts'/>
///<reference path='../../Util/IntervalList/IntervalOverlapError.ts'/>
var Model;
(function (Model) {
    (function (Schedulers) {
        var IntervalList = Util.IntervalList.IntervalList;
        var IntervalDate = Util.IntervalList.IntervalDate;
        var IntervalOverlapError = Util.IntervalList.IntervalOverlapError;

        var ResourceManager = (function () {
            function ResourceManager() {
                this.resourceUsage = [];
            }
            ResourceManager.prototype.allocateResource = function (resourceType, from, to) {
                var resourceTypeUsage = this.resourceUsage[resourceType.id];
                if (resourceTypeUsage == null) {
                    resourceTypeUsage = [];
                    this.resourceUsage[resourceType.id] = resourceTypeUsage;
                }
                var newFromDate = null;
                var length = to.getTime() - from.getTime();

                for (var i = 0; i < resourceTypeUsage.length; i++) {
                    var intervalList = resourceTypeUsage[i];
                    try  {
                        //try to push the interval
                        intervalList.push(new IntervalDate(from, to));

                        //no error, we found a good interval for the task's resource
                        return null;
                    } catch (err) {
                        //if error and error type is IntervalOverlapError then search an interval, which is good
                        if (err instanceof IntervalOverlapError) {
                            var start = new Date(from.getTime());
                            intervalList.each(function (interval) {
                                var gap = start.getTime() - interval.from.getTime();
                                if (gap > length && (newFromDate == null || newFromDate.getTime() > interval.from.getTime())) {
                                    newFromDate = new Date(start.getTime());
                                    return false;
                                }
                                start.setTime(interval.to.getTime());
                                return true;
                            });
                            if (newFromDate == null || intervalList.last().to.getTime() < newFromDate.getTime()) {
                                newFromDate = new Date(intervalList.last().to.getTime());
                            }
                        } else {
                            throw err;
                        }
                    }
                }

                //if not all available resource has been used
                if (i < resourceType.available) {
                    //create a new one
                    var intervalList = new IntervalList();

                    //push our interval to it
                    intervalList.push(new IntervalDate(from, to));
                    resourceTypeUsage.push(intervalList);
                    return null;
                }

                return newFromDate;
            };
            return ResourceManager;
        })();
        Schedulers.ResourceManager = ResourceManager;
    })(Model.Schedulers || (Model.Schedulers = {}));
    var Schedulers = Model.Schedulers;
})(Model || (Model = {}));
//# sourceMappingURL=ResourceManager.js.map

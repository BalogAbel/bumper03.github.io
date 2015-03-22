///<reference path='../../../../references.ts'/>

module Model.Schedulers {

	import IntervalList = Util.IntervalList.IntervalList;
	import IntervalDate = Util.IntervalList.IntervalDate;
	import IntervalOverlapError = Util.IntervalList.IntervalOverlapError;
	import ResourceType = Model.Resources.ResourceType;

	export class ResourceManager {

		private resourceUsage: IntervalList<IntervalDate>[][];

		constructor() {
			this.resourceUsage = [];
		}

		allocateResource(resourceType: ResourceType, from: Date, to: Date): Date {
			var resourceTypeUsage = this.resourceUsage[resourceType.id];
			if(resourceTypeUsage == null) {
				resourceTypeUsage = [];
				this.resourceUsage[resourceType.id] = resourceTypeUsage;
			}
			var newFromDate: Date = null;
			var length = to.getTime() - from.getTime();
			//go through all available resource
			for(var i = 0; i < resourceTypeUsage.length; i++) {
				var intervalList = resourceTypeUsage[i];
				try {
					//try to push the interval
					intervalList.push(new IntervalDate(from, to));
					//no error, we found a good interval for the task's resource
					return null;
				} catch(err) {
					//if error and error type is IntervalOverlapError then search an interval, which is good
					if(err instanceof IntervalOverlapError) {
						var start = new Date(from.getTime());
						intervalList.each((interval): boolean => {
							var gap = start.getTime() - interval.from.getTime();
							if(gap > length && (newFromDate == null || newFromDate.getTime() > interval.from.getTime())) {
								newFromDate = new Date(start.getTime());
								return false;
							}
							start.setTime(interval.to.getTime());
							return true;
						});
						if(newFromDate == null || intervalList.last().to.getTime() < newFromDate.getTime()) {
							newFromDate = new Date(intervalList.last().to.getTime());
						}
					} else {
						throw err;
					}
				}

			}
			//if not all available resource has been used
			if(i < resourceType.available) {
				//create a new one
				var intervalList = new IntervalList<IntervalDate>();
				//push our interval to it
				intervalList.push( new IntervalDate(from, to));
				resourceTypeUsage.push(intervalList);
				return null;
			}

			return newFromDate;

		}

	}
}
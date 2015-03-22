///<reference path='../../../references.ts'/>

module Model.WorkingCalendar {
	import WorkingDay = Model.WorkingCalendar.WorkingDay;
	import Duration = Model.WorkingCalendar.Duration;

	export class WorkingCalendar {
		private static _instance: WorkingCalendar = null;

		workingDays: boolean[];
		normalWorkingDay: WorkingDay;


		static getWorkingCalendar(): WorkingCalendar {
			if(WorkingCalendar._instance == null) {
				WorkingCalendar._instance = new WorkingCalendar();
			}
			return WorkingCalendar._instance;

		}

		constructor() {
			this.workingDays = [, true, true, true, true, true, false, false];
			this.normalWorkingDay = new WorkingDay();
		}

		add(date: Date, duration: Duration): Date {
			var result = new Date(date.getTime());
			this.addMinutes(result, duration.getCost());
			return result;

		}

		subTract(date: Date, duration: Duration) {
			var result = new Date(date.getTime());
			this.addMinutes(result, duration.getCost(), true);
			return result;

		}


		private addMinutes(date: Date, remainingMinutes: number, backward: boolean = false) {
			while(remainingMinutes != 0) {
				var workingDay = this.getActualWorkingDay(date, backward);
				remainingMinutes = backward
					? workingDay.subtract(date, remainingMinutes)
					: workingDay.add(date, remainingMinutes);
				if(remainingMinutes != 0) {
					this.setToNextDay(date, backward);
				}
			}
		}

		setToWorkingPeriod(date: Date, backward: boolean = false) {
			if(this.getActualWorkingDay(date, backward).isEnd(date, backward)) {
				this.setToNextDay(date, backward);
			}
			this.getActualWorkingDay(date, backward).setTimeToPeriod(date, backward);

		}

		isWorkingDay(date: Date): boolean {
			return this.workingDays[date.getDay()];
		}


		private getActualWorkingDay(date: Date, backward: boolean = false): WorkingDay {
			while(!this.workingDays[date.getDay()]) {
				this.setToNextDay(date, backward);
			}
			return this.normalWorkingDay;
		}

		private setToNextDay(date: Date, backward: boolean = false) {
			if(backward) {
				date.setDate(date.getDate() - 1);
				date.setHours(23, 59, 0, 0);
			} else {
				date.setDate(date.getDate() + 1);
				date.setHours(0, 0, 0, 0);
			}
		}

	}
}
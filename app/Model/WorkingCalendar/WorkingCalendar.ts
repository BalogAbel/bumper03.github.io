///<reference path='Duration.ts'/>
///<reference path='WorkingDay.ts'/>

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

		add(date: Date, duration: Duration) {
			this.addMinutes(date, duration.getCost());

		}

		addDate(date: Date, addDate: Date) {
			this.addMinutes(date, Math.floor(addDate.getTime() / 1000 / 60));
		}

		private addMinutes(date: Date, remainingMinutes: number) {
			while(remainingMinutes != 0) {
				remainingMinutes = this.getActualWorkingDay(date).add(date, remainingMinutes);
				if(remainingMinutes != 0) {
					date.setDate(date.getDate() + 1);
					date.setHours(0, 0, 0, 0);
				}
			}
		}

		setToWorkingPeriod(date: Date) {
			if(this.getActualWorkingDay(date).isEnd(date)) {
				date.setDate(date.getDate() + 1);
				date.setHours(0, 0, 0, 0);
			}
			this.getActualWorkingDay(date).setTimeToPeriod(date);

		}

		private getActualWorkingDay(date: Date): WorkingDay {
			while(!this.workingDays[date.getDay()]) {
				date.setDate(date.getDate() + 1);
				date.setHours(0, 0, 0, 0);
			}
			return this.normalWorkingDay;
		}
	}
}
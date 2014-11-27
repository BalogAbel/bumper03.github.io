///<reference path='../../lib/jquery.d.ts'/>

module View {
	export class Utils {
		static taskLineHeight: number = 30;
		static dayWidth: number = 100;
		static startDate: Date = new Date();
		static finishDate: Date = new Date();

		static getTimeLineWidth(): number {
			return $("#timeLineWrapper").width();
		}

		static getCanvasHeight(): number {
			return $("#taskWrapper").height();
		}

		static dateToPosition(date: Date): number {
			var days: number = (date.getTime() - this.startDate.getTime()) / 1000 / 60 / 60 / 24;
			return days * this.dayWidth;
		}

		static positionToDate(position: number): Date {
			var time: number = (position / this.dayWidth) * 24 * 60 * 60 * 1000;
			return new Date(this.startDate.getTime() + Math.round(time));
		}

		static getCanvasWidth(): number {
			return Math.ceil((Utils.finishDate.getTime() - Utils.startDate.getTime()) / 1000 / 60 / 60 / 24) * Utils.dayWidth;
		}

		static getZoomLevel(): number {
			if(Utils.dayWidth > 300) return 1;

			return 0;
		}


	}
}
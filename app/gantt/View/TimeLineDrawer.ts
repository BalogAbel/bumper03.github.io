///<reference path='../../../references.ts'/>
module View {
    import TaskDrawer =  View.TaskDrawer;
	import Utils =  View.Utils;
	import WorkingCalendar =  Model.WorkingCalendar.WorkingCalendar;

    export class TimeLineDrawer {
		private static sampleDay: Kinetic.IGroup = null;
		private static sampleHour: Kinetic.IGroup = null;

		draw(layer: Kinetic.ILayer) {
			var date: Date = new Date(Utils.startDate.getTime());
			for(var i: number = 0; date.getTime() < Utils.finishDate.getTime(); i++) {
				var dayNode = this.getSingleDay(date);
				layer.add(dayNode);
				if(Utils.getZoomLevel() > 0) {
					for(var j: number = 1; j < 24; j++) {
						dayNode.add(this.getSingleHour(j));
					}
				}
				dayNode.setPosition({x: Utils.dayWidth * i, y: dayNode.getPosition().y});
				date.setDate(date.getDate() + 1);
			}
		}

		private getSingleDay(date: Date): Kinetic.IGroup {
			if(TimeLineDrawer.sampleDay == null) TimeLineDrawer.createSampleDay();
			var node: Kinetic.IGroup = <Kinetic.IGroup>TimeLineDrawer.sampleDay.clone({});
			var dateText = <Kinetic.IText>node.find('.Date')[0];
			dateText.width(Utils.dayWidth);
			dateText.name("taskdate" + date.getTime());
			if(!WorkingCalendar.getWorkingCalendar().isWorkingDay(date)) {
				dateText.setFill("grey");
				node.find('.breakRect')[0].width(Utils.dayWidth);
			} else {
				node.find('.breakRect')[0].remove();
			}
			dateText.setText(date.getMonth()+1 + ". " + this.padding(date.getDate(), 2)+ ".");
			return node;

		}

		private getSingleHour(hour: number): Kinetic.IGroup {
			if(TimeLineDrawer.sampleHour == null) TimeLineDrawer.createSampleHour();
			var node: Kinetic.IGroup = <Kinetic.IGroup>TimeLineDrawer.sampleHour.clone({});
			var hourText = <Kinetic.IText>node.find('.hourText')[0];
			hourText.setText(hour.toString());
			node.setPosition({x: Utils.dayWidth / 23 * (hour-1), y: Utils.taskLineHeight / 1.3});
			return node;

		}

        private static createSampleDay() {
            TimeLineDrawer.sampleDay = new Kinetic.Group({
                x: 0,
                y: 0
            });

			var line1 = new Kinetic.Line({
                name: 'TaskLine',
                stroke: 'grey',
                dash: [1, 1],
                x: 0,
                y:0,
                points: [0, 0, 0, Utils.getCanvasHeight()-2]
            });

			var date = new Kinetic.Text({
				width: Utils.dayWidth,
				height: Utils.taskLineHeight,
				align: 'center',
				name: 'Date',
				text: 'Sample Date',
				fontSize: Utils.taskLineHeight * 2 / 3,
				fontFamily: 'Calibri',
				fill: 'blue'
			});


			var breakRect = new Kinetic.Rect({
				y: Utils.taskLineHeight * 1.5,
				name: 'breakRect',
				width: Utils.dayWidth,
				height: Utils.getCanvasHeight()-2 - Utils.taskLineHeight*1.5,
				opacity: 0.1,
				fill: 'black',
				listening: false
			});


			var date = new Kinetic.Text({
				width: Utils.dayWidth,
				height: Utils.taskLineHeight,
				align: 'center',
				name: 'Date',
				text: 'Sample Date',
				fontSize: Utils.taskLineHeight * 2 / 3,
				fontFamily: 'Calibri',
				fill: 'blue'
			});

			TimeLineDrawer.sampleDay.add(line1);
			TimeLineDrawer.sampleDay.add(date);
			TimeLineDrawer.sampleDay.add(breakRect);
        }

		private static createSampleHour() {
			TimeLineDrawer.sampleHour = new Kinetic.Group({
				x: 0,
				y: 0
			});
			var hourWidth = Utils.dayWidth / 23;
			var text = new Kinetic.Text({
				name: 'hourText',
				text: '99',
				width: hourWidth,
				align: 'center',
				fontSize: Utils.taskLineHeight / 2.8,
				fontFamily: 'Calibri',
				fill: 'black'
			});
			var line = new Kinetic.Line({
				name: 'hourLine',
				points: [
					hourWidth / 2, Utils.taskLineHeight / 2.5,
					hourWidth / 2, Utils.taskLineHeight / 1.5
				],
				stroke: 'grey',
				strokeWidth: 1
			});
			TimeLineDrawer.sampleHour.add(text);
			TimeLineDrawer.sampleHour.add(line);
		}

        private padding(num: number, padding: number): string {
            var n: string = num.toString();
            return n.length >= padding ? n : new Array(padding - n.length + 1).join('0') + n;

        }
    }
}
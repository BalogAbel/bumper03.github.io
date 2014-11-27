///<reference path='../../lib/kineticjs.d.ts'/>
///<reference path='TaskDrawer.ts'/>
///<reference path='Utils.ts'/>
///<reference path='../Model/WorkingCalendar/WorkingCalendar.ts'/>
var View;
(function (View) {
    var Utils = View.Utils;
    var WorkingCalendar = Model.WorkingCalendar.WorkingCalendar;

    var TimeLineDrawer = (function () {
        function TimeLineDrawer() {
        }
        TimeLineDrawer.prototype.draw = function (layer) {
            var date = new Date(Utils.startDate.getTime());
            for (var i = 0; date.getTime() < Utils.finishDate.getTime(); i++) {
                var dayNode = this.getSingleDay(date);
                layer.add(dayNode);
                if (Utils.getZoomLevel() > 0) {
                    for (var j = 1; j < 24; j++) {
                        dayNode.add(this.getSingleHour(j));
                    }
                }
                dayNode.setPosition({ x: Utils.dayWidth * i, y: dayNode.getPosition().y });
                date.setDate(date.getDate() + 1);
            }
        };

        TimeLineDrawer.prototype.getSingleDay = function (date) {
            if (TimeLineDrawer.sampleDay == null)
                TimeLineDrawer.createSampleDay();
            var node = TimeLineDrawer.sampleDay.clone({});
            var dateText = node.find('.Date')[0];
            dateText.width(Utils.dayWidth);
            dateText.name("taskdate" + date.getTime());
            if (!WorkingCalendar.getWorkingCalendar().isWorkingDay(date)) {
                dateText.setFill("grey");
                node.find('.breakRect')[0].width(Utils.dayWidth);
            } else {
                node.find('.breakRect')[0].remove();
            }
            dateText.setText(date.getMonth() + 1 + ". " + this.padding(date.getDate(), 2) + ".");
            return node;
        };

        TimeLineDrawer.prototype.getSingleHour = function (hour) {
            if (TimeLineDrawer.sampleHour == null)
                TimeLineDrawer.createSampleHour();
            var node = TimeLineDrawer.sampleHour.clone({});
            var hourText = node.find('.hourText')[0];
            hourText.setText(hour.toString());
            node.setPosition({ x: Utils.dayWidth / 23 * (hour - 1), y: Utils.taskLineHeight / 1.3 });
            return node;
        };

        TimeLineDrawer.createSampleDay = function () {
            TimeLineDrawer.sampleDay = new Kinetic.Group({
                x: 0,
                y: 0
            });

            var line1 = new Kinetic.Line({
                name: 'TaskLine',
                stroke: 'grey',
                dash: [1, 1],
                x: 0,
                y: 0,
                points: [0, 0, 0, Utils.getCanvasHeight() - 2]
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
                height: Utils.getCanvasHeight() - 2 - Utils.taskLineHeight * 1.5,
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
        };

        TimeLineDrawer.createSampleHour = function () {
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
        };

        TimeLineDrawer.prototype.padding = function (num, padding) {
            var n = num.toString();
            return n.length >= padding ? n : new Array(padding - n.length + 1).join('0') + n;
        };
        TimeLineDrawer.sampleDay = null;
        TimeLineDrawer.sampleHour = null;
        return TimeLineDrawer;
    })();
    View.TimeLineDrawer = TimeLineDrawer;
})(View || (View = {}));
//# sourceMappingURL=TimeLineDrawer.js.map

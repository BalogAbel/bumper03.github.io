"use strict";
var Utils_1 = require("./Utils");
var WorkingCalendar_1 = require("../Model/WorkingCalendar/WorkingCalendar");
var TimeLineDrawer = (function () {
    function TimeLineDrawer() {
    }
    TimeLineDrawer.prototype.draw = function (layer) {
        TimeLineDrawer.createSampleDay();
        var date = new Date(Utils_1.Utils.startDate.getTime());
        for (var i = 0; date.getTime() < Utils_1.Utils.finishDate.getTime(); i++) {
            var dayNode = this.getSingleDay(date);
            layer.add(dayNode);
            dayNode.moveToBottom();
            if (Utils_1.Utils.getZoomLevel() > 0) {
                for (var j = 1; j < 24; j++) {
                    dayNode.add(this.getSingleHour(j));
                }
            }
            dayNode.position({ x: Utils_1.Utils.dayWidth * i, y: dayNode.position().y });
            date.setDate(date.getDate() + 1);
        }
    };
    TimeLineDrawer.prototype.getSingleDay = function (date) {
        var node = TimeLineDrawer.sampleDay.clone({});
        var dateText = node.find('.Date')[0];
        dateText.width(Utils_1.Utils.dayWidth);
        dateText.name("taskdate" + date.getTime());
        if (!WorkingCalendar_1.WorkingCalendar.getWorkingCalendar().isWorkingDay(date)) {
            dateText.fill("grey");
            node.find('.breakRect')[0].width(Utils_1.Utils.dayWidth);
        }
        else {
            node.find('.breakRect')[0].remove();
        }
        dateText.text(this.padding(date.getMonth() + 1, 2) + ". " + this.padding(date.getDate(), 2) + ".");
        return node;
    };
    TimeLineDrawer.prototype.getSingleHour = function (hour) {
        if (TimeLineDrawer.sampleHour == null)
            TimeLineDrawer.createSampleHour();
        var node = TimeLineDrawer.sampleHour.clone({});
        var hourText = node.find('.hourText')[0];
        hourText.text(hour.toString());
        node.position({ x: Utils_1.Utils.dayWidth / 23 * (hour - 1), y: Utils_1.Utils.taskLineHeight / 1.3 });
        return node;
    };
    TimeLineDrawer.createSampleDay = function () {
        TimeLineDrawer.sampleDay = new Konva.Group({
            x: 0,
            y: 0
        });
        var line1 = new Konva.Line({
            name: 'TaskLine',
            strokeWidth: 0.5,
            stroke: 'grey',
            //dash: [1, 1],
            x: 0,
            y: 0,
            points: [0, 0, 0, Utils_1.Utils.getCanvasHeight() - 2]
        });
        var breakRect = new Konva.Rect({
            y: Utils_1.Utils.taskLineHeight * 1.5,
            name: 'breakRect',
            width: Utils_1.Utils.dayWidth,
            height: Utils_1.Utils.getCanvasHeight() - 2 - Utils_1.Utils.taskLineHeight * 1.5,
            opacity: 0.1,
            fill: 'black',
            listening: false
        });
        var date = new Konva.Text({
            width: Utils_1.Utils.dayWidth,
            height: Utils_1.Utils.taskLineHeight,
            align: 'center',
            name: 'Date',
            text: 'Sample Date',
            fontSize: Utils_1.Utils.taskLineHeight * 2 / 3,
            fontFamily: 'Roboto',
            fill: '#009688'
        });
        TimeLineDrawer.sampleDay.add(line1);
        TimeLineDrawer.sampleDay.add(date);
        TimeLineDrawer.sampleDay.add(breakRect);
    };
    TimeLineDrawer.createSampleHour = function () {
        TimeLineDrawer.sampleHour = new Konva.Group({
            x: 0,
            y: 0
        });
        var hourWidth = Utils_1.Utils.dayWidth / 23;
        var text = new Konva.Text({
            name: 'hourText',
            text: '99',
            width: hourWidth,
            align: 'center',
            fontSize: Utils_1.Utils.taskLineHeight / 2.8,
            fontFamily: 'Roboto',
            fill: 'black'
        });
        var line = new Konva.Line({
            name: 'hourLine',
            points: [
                hourWidth / 2, Utils_1.Utils.taskLineHeight / 2.5,
                hourWidth / 2, Utils_1.Utils.taskLineHeight / 1.5
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
}());
exports.TimeLineDrawer = TimeLineDrawer;
//# sourceMappingURL=TimeLineDrawer.js.map
///<reference path='../../lib/kineticjs.d.ts'/>
///<reference path='TaskDrawer.ts'/>
///<reference path='Utils.ts'/>
var View;
(function (View) {
    var Utils = View.Utils;

    var TimeLineDrawer = (function () {
        function TimeLineDrawer() {
        }
        TimeLineDrawer.prototype.draw = function (layer) {
            if (TimeLineDrawer.sampleDay == null)
                this.createSample();
            var date = new Date(Utils.startDate.getTime());
            for (var i = 0; date.getTime() < Utils.finishDate.getTime(); i++) {
                var node = TimeLineDrawer.sampleDay.clone({});
                var dateText = node.find('.Date')[0];
                dateText.name("taskdate" + date.getTime());
                dateText.setText(date.getMonth() + 1 + ". " + this.padding(date.getDate(), 2) + ".");
                node.setPosition({ x: Utils.dayWidth * i, y: node.getPosition().y });
                layer.add(node);

                date.setDate(date.getDate() + 1);
            }
        };

        TimeLineDrawer.prototype.createSample = function () {
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

            TimeLineDrawer.sampleDay.add(line1);
            TimeLineDrawer.sampleDay.add(date);
        };

        TimeLineDrawer.prototype.padding = function (num, padding) {
            var n = num.toString();
            return n.length >= padding ? n : new Array(padding - n.length + 1).join('0') + n;
        };
        TimeLineDrawer.sampleDay = null;
        return TimeLineDrawer;
    })();
    View.TimeLineDrawer = TimeLineDrawer;
})(View || (View = {}));
//# sourceMappingURL=TimeLineDrawer.js.map

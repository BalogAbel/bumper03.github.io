///<reference path='../../references.ts'/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var View;
(function (View) {
    var TaskDrawer = View.TaskDrawer;
    var Utils = View.Utils;
    var SchedulableDrawer = (function (_super) {
        __extends(SchedulableDrawer, _super);
        function SchedulableDrawer() {
            _super.apply(this, arguments);
        }
        SchedulableDrawer.prototype.getTask = function () {
            return this.task;
        };
        SchedulableDrawer.prototype.draw = function (layer, timeLineLayer) {
            if (SchedulableDrawer.schedulableSample == null)
                this.createSample();
            this.taskGroup = SchedulableDrawer.schedulableSample.clone({});
            this.taskGroup.position({
                x: Utils.dateToPosition(this.getTask().start),
                y: TaskDrawer.actualPosition.y + Utils.taskLineHeight * 0.15
            });
            var durationRect = this.taskGroup.find('.durationRect')[0];
            durationRect.width(Utils.dateToPosition(this.getTask().finish) - Utils.dateToPosition(this.getTask().start));
            if (this.getTask().earliestFinish.getTime() == this.getTask().latestFinish.getTime()) {
                durationRect.fill("#FFFF85");
            }
            timeLineLayer.add(this.taskGroup);
            _super.prototype.draw.call(this, layer, timeLineLayer);
        };
        SchedulableDrawer.prototype.createSample = function () {
            SchedulableDrawer.schedulableSample = new Konva.Group({
                x: 0,
                y: 0,
                draggable: true,
                dragBoundFunc: function (pos) {
                    var y = this.getAbsolutePosition().y;
                    return {
                        x: pos.x > 0 ? pos.x : 0,
                        y: y
                    };
                }
            });
            var rect = new Konva.Rect({
                name: "durationRect",
                //cornerRadius: 5,
                x: 0,
                y: 0,
                height: Utils.taskLineHeight * 0.7,
                fill: '#ADFF85',
                //stroke: 'black',
                //strokeWidth: 2,
                shadowColor: '#999',
                shadowBlur: 5,
                shadowOffsetX: 0,
                shadowOffsetY: 2
            });
            SchedulableDrawer.schedulableSample.add(rect);
        };
        return SchedulableDrawer;
    })(TaskDrawer);
    View.SchedulableDrawer = SchedulableDrawer;
})(View || (View = {}));
//# sourceMappingURL=SchedulableDrawer.js.map
///<reference path='../../../references.ts'/>
var __extends = this.__extends || function (d, b) {
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
            var node = SchedulableDrawer.schedulableSample.clone({});
            node.setPosition({
                x: Utils.dateToPosition(this.getTask().start),
                y: TaskDrawer.actualPosition.y
            });
            var durationRect = node.find('.durationRect')[0];
            durationRect.setWidth(Utils.dateToPosition(this.getTask().finish) - Utils.dateToPosition(this.getTask().start));
            if (this.getTask().earliestFinish.getTime() == this.getTask().latestFinish.getTime()) {
                durationRect.setStroke("red");
            }
            var that = this;
            durationRect.on("dragend", function (evt) {
                that.dragged(evt);
            });
            timeLineLayer.add(node);
            _super.prototype.draw.call(this, layer, timeLineLayer);
        };
        SchedulableDrawer.prototype.createSample = function () {
            SchedulableDrawer.schedulableSample = new Kinetic.Group({
                x: 0,
                y: 0
            });
            var rect = new Kinetic.Rect({
                name: "durationRect",
                cornerRadius: 5,
                x: 0,
                y: 0,
                height: Utils.taskLineHeight,
                fill: '#ADFF85',
                stroke: 'black',
                strokeWidth: 2,
                draggable: true,
                dragBoundFunc: function (pos) {
                    var y = this.getAbsolutePosition().y;
                    return {
                        x: pos.x > 0 ? pos.x : 0,
                        y: y
                    };
                }
            });
            SchedulableDrawer.schedulableSample.add(rect);
        };
        return SchedulableDrawer;
    })(TaskDrawer);
    View.SchedulableDrawer = SchedulableDrawer;
})(View || (View = {}));
//# sourceMappingURL=SchedulableDrawer.js.map
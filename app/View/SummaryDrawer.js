///<reference path='../Model/Summary.ts'/>
///<reference path='TaskDrawer.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var View;
(function (View) {
    var TaskDrawer = View.TaskDrawer;
    var SummaryDrawer = (function (_super) {
        __extends(SummaryDrawer, _super);
        function SummaryDrawer() {
            _super.call(this);
            this.subDrawers = [];
        }
        SummaryDrawer.prototype.draw = function (layer, timeLineLayer) {
            if (SummaryDrawer.summarySample == null)
                this.createSummarySample();

            var node = SummaryDrawer.summarySample.clone({});
            node.setPosition({
                x: View.Utils.dateToPosition(this.getTask().start),
                y: TaskDrawer.actualPosition.y
            });

            var durationRect = node.find('.durationRect')[0];
            durationRect.setWidth(View.Utils.dateToPosition(this.getTask().finish) - View.Utils.dateToPosition(this.getTask().start));
            var that = this;
            durationRect.on("dragend", function (evt) {
                that.dragged(evt);
            });

            timeLineLayer.add(node);

            _super.prototype.draw.call(this, layer, timeLineLayer);

            var sumTask = this.getTask();
            TaskDrawer.actualPosition.x += View.Utils.taskLineHeight;
            for (var i = 0; i < this.subDrawers.length; i++) {
                this.subDrawers[i].draw(layer, timeLineLayer);
            }
            TaskDrawer.actualPosition.x -= View.Utils.taskLineHeight;
        };

        SummaryDrawer.prototype.createSummarySample = function () {
            SummaryDrawer.summarySample = new Kinetic.Group({ x: 0, y: 0 });

            var rect = new Kinetic.Rect({
                name: "durationRect",
                cornerRadius: 1,
                x: 0,
                y: View.Utils.taskLineHeight * 0.33,
                height: View.Utils.taskLineHeight * 0.33,
                fill: '#99C2FF',
                stroke: 'black',
                strokeWidth: 1,
                draggable: true,
                dragBoundFunc: function (pos) {
                    var y = this.getAbsolutePosition().y;
                    return {
                        x: pos.x > 0 ? pos.x : 0,
                        y: y
                    };
                }
            });

            SummaryDrawer.summarySample.add(rect);
        };

        SummaryDrawer.prototype.getTask = function () {
            return this.task;
        };
        return SummaryDrawer;
    })(TaskDrawer);
    View.SummaryDrawer = SummaryDrawer;
})(View || (View = {}));
//# sourceMappingURL=SummaryDrawer.js.map

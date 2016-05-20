"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TaskDrawer_1 = require("./TaskDrawer");
var Utils_1 = require("./Utils");
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
            x: Utils_1.Utils.dateToPosition(this.getTask().start),
            y: TaskDrawer_1.TaskDrawer.actualPosition.y + Utils_1.Utils.taskLineHeight * 0.15
        });
        var durationRect = this.taskGroup.find('.durationRect')[0];
        var width = Utils_1.Utils.dateToPosition(this.getTask().finish) - Utils_1.Utils.dateToPosition(this.getTask().start);
        durationRect.width(width);
        if (this.getTask().earliestFinish.getTime() == this.getTask().latestFinish.getTime()) {
            durationRect.fill("#33691E");
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
            height: Utils_1.Utils.taskLineHeight * 0.7,
            fill: '#2E7D32',
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
}(TaskDrawer_1.TaskDrawer));
exports.SchedulableDrawer = SchedulableDrawer;
//# sourceMappingURL=SchedulableDrawer.js.map
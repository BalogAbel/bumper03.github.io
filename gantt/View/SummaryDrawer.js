"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Utils_1 = require("./Utils");
var TaskDrawer_1 = require("./TaskDrawer");
var SummaryDrawer = (function (_super) {
    __extends(SummaryDrawer, _super);
    function SummaryDrawer() {
        _super.call(this);
        this.subDrawers = [];
    }
    SummaryDrawer.prototype.draw = function (layer, timeLineLayer) {
        if (SummaryDrawer.summarySample == null)
            this.createSummarySample();
        this.taskGroup = SummaryDrawer.summarySample.clone({});
        this.taskGroup.position({
            x: Utils_1.Utils.dateToPosition(this.getTask().start),
            y: TaskDrawer_1.TaskDrawer.actualPosition.y
        });
        var durationRect = this.taskGroup.find('.durationRect')[0];
        durationRect.width(Utils_1.Utils.dateToPosition(this.getTask().finish) - Utils_1.Utils.dateToPosition(this.getTask().start));
        var that = this;
        timeLineLayer.add(this.taskGroup);
        _super.prototype.draw.call(this, layer, timeLineLayer);
        var sumTask = this.getTask();
        TaskDrawer_1.TaskDrawer.actualPosition.x += Utils_1.Utils.taskLineHeight;
        for (var i = 0; i < this.subDrawers.length; i++) {
            this.subDrawers[i].draw(layer, timeLineLayer);
        }
        TaskDrawer_1.TaskDrawer.actualPosition.x -= Utils_1.Utils.taskLineHeight;
    };
    SummaryDrawer.prototype.createSummarySample = function () {
        SummaryDrawer.summarySample = new Konva.Group({
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
            x: 0,
            y: Utils_1.Utils.taskLineHeight * 0.33,
            height: Utils_1.Utils.taskLineHeight * 0.33,
            fill: '#99C2FF',
            shadowColor: '#999',
            shadowBlur: 5,
            shadowOffsetX: 0,
            shadowOffsetY: 2
        });
        SummaryDrawer.summarySample.add(rect);
    };
    SummaryDrawer.prototype.getTask = function () {
        return this.task;
    };
    SummaryDrawer.prototype.update = function (layer) {
        _super.prototype.update.call(this, layer);
        for (var i = 0; i < this.subDrawers.length; i++) {
            this.subDrawers[i].update(layer);
        }
    };
    return SummaryDrawer;
}(TaskDrawer_1.TaskDrawer));
exports.SummaryDrawer = SummaryDrawer;
//# sourceMappingURL=SummaryDrawer.js.map
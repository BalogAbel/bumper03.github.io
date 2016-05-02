import {Summary} from "../Model/Summary";
import {Utils} from "./Utils";
import {TaskDrawer} from "./TaskDrawer";
export class SummaryDrawer extends TaskDrawer {
    private static summarySample:Konva.Group;

    subDrawers:TaskDrawer[];

    constructor() {
        super();
        this.subDrawers = [];
    }

    draw(layer:Konva.Layer, timeLineLayer:Konva.Layer) {
        if (SummaryDrawer.summarySample == null) this.createSummarySample();

        this.taskGroup = <Konva.Group>SummaryDrawer.summarySample.clone({});

        this.taskGroup.position({
            x: Utils.dateToPosition(this.getTask().start),
            y: TaskDrawer.actualPosition.y
        });


        var durationRect = <Konva.Text>this.taskGroup.find('.durationRect')[0];
        var width = Utils.dateToPosition(this.getTask().finish) - Utils.dateToPosition(this.getTask().start)
        durationRect.width(width);
        
        var that = this;
        timeLineLayer.add(this.taskGroup);


        super.draw(layer, timeLineLayer);

        var sumTask = this.getTask();
        TaskDrawer.actualPosition.x += Utils.taskLineHeight;
        for (var i:number = 0; i < this.subDrawers.length; i++) {
            this.subDrawers[i].draw(layer, timeLineLayer);
        }
        TaskDrawer.actualPosition.x -= Utils.taskLineHeight;

    }

    private createSummarySample() {
        SummaryDrawer.summarySample = new Konva.Group({
            x: 0,
            y: 0,
            draggable: true,
            dragBoundFunc: function (pos:Konva.Vector2d) {
                var y:number = this.getAbsolutePosition().y;
                return {
                    x: pos.x > 0 ? pos.x : 0,
                    y: y
                };
            }
        });

        var rect = new Konva.Rect({
            name: "durationRect",
            x: 0,
            y: Utils.taskLineHeight * 0.33,
            height: Utils.taskLineHeight * 0.33,
            fill: '#99C2FF',
            shadowColor: '#999',
            shadowBlur: 5,
            shadowOffsetX: 0,
            shadowOffsetY: 2

        });

        SummaryDrawer.summarySample.add(rect);
    }


    getTask():Summary {
        return <Summary>this.task;
    }


    update(layer:Konva.Layer):void {
        super.update(layer);
        for (var i:number = 0; i < this.subDrawers.length; i++) {
            this.subDrawers[i].update(layer);
        }
    }
}

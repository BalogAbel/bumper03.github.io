///<reference path='../../references.ts'/>

module View {

    import Schedulable = Model.Schedulable;
    import TaskDrawer = View.TaskDrawer;
    import Utils = View.Utils;

    export class SchedulableDrawer extends TaskDrawer {

        private static schedulableSample: Konva.IGroup;

        getTask(): Schedulable {
            return <Schedulable>this.task;
        }

        draw(layer: Konva.ILayer, timeLineLayer: Konva.ILayer) {

            if (SchedulableDrawer.schedulableSample == null)
                this.createSample();

            this.taskGroup = <Konva.IGroup>SchedulableDrawer.schedulableSample.clone({});
            this.taskGroup.position({
                x: Utils.dateToPosition(this.getTask().start),
                y: TaskDrawer.actualPosition.y + Utils.taskLineHeight * 0.15
            });


            var durationRect = <Konva.IRect>this.taskGroup.find('.durationRect')[0];
            durationRect.width(Utils.dateToPosition(this.getTask().finish) - Utils.dateToPosition(this.getTask().start));
            if (this.getTask().earliestFinish.getTime() == this.getTask().latestFinish.getTime()) {
                durationRect.fill("#FFFF85");
            }

            timeLineLayer.add(this.taskGroup);

            super.draw(layer, timeLineLayer);

        }

        createSample() {
            SchedulableDrawer.schedulableSample = new Konva.Group({
                x: 0,
                y: 0,
                draggable: true,
                dragBoundFunc: function (pos: Konva.Vector2d) {
                    var y: number = this.getAbsolutePosition().y;
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
        }


    }
}
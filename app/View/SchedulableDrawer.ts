///<reference path='../Model/Schedulable.ts'/>
///<reference path='TaskDrawer.ts'/>
///<reference path='Utils.ts'/>
///<reference path='../../lib/kineticjs.d.ts'/>

module View {

    import Schedulable = Model.Schedulable;
    import TaskDrawer = View.TaskDrawer;
    import Utils = View.Utils;

    export class SchedulableDrawer extends TaskDrawer {

        private static schedulableSample: Kinetic.IGroup;

        getTask(): Schedulable {
            return <Schedulable>this.task;
        }

        draw(layer: Kinetic.ILayer, timeLineLayer: Kinetic.ILayer) {

            if(SchedulableDrawer.schedulableSample == null)
                this.createSample();

            var node: Kinetic.IGroup = <Kinetic.IGroup>SchedulableDrawer.schedulableSample.clone({});
            node.setPosition({
                x: Utils.dateToPosition(this.getTask().start),
                y: TaskDrawer.actualPosition.y
            });

            var durationRect = <Kinetic.IText>node.find('.durationRect')[0];
			durationRect.setWidth(Utils.dateToPosition(this.getTask().finish) - Utils.dateToPosition(this.getTask().start));
			var that = this;
			durationRect.on("dragend", function(evt) {
				that.dragged(evt);
			})

            timeLineLayer.add(node);

            super.draw(layer, timeLineLayer);

        }

        createSample() {
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
                strokeWidth: 1,
                draggable: true,
                dragBoundFunc: function(pos: Kinetic.Vector2d) {
                    var y: number = this.getAbsolutePosition().y;
                    return {
                        x: pos.x > 0 ? pos.x : 0,
                        y: y
                    };
                }
            });

            SchedulableDrawer.schedulableSample.add(rect);
        }


    }
}
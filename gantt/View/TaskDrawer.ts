///<reference path='../../references.ts'/>

module View {
    import Task = Model.Task;
    import Utils = View.Utils;
    import PojectDrawer = View.ProjectDrawer;

    export class TaskDrawer {
        task: Task;
        private static taskNameSample: Konva.IGroup;
        private static taskTimeLineSample: Konva.IGroup;
        static actualPosition: Konva.Vector2d;

        public taskGroup: Konva.IGroup;

        draw(layer: Konva.ILayer, timeLineLayer: Konva.ILayer) {
            if (TaskDrawer.taskNameSample == null || TaskDrawer.taskTimeLineSample == null)
                this.createSamples();

            var node = <Konva.IGroup>TaskDrawer.taskNameSample.clone({});

            var taskName = <Konva.IText>node.find('.TaskName')[0];
            taskName.name('TaskName' + this.task.id);
            taskName.text(this.task.name);

            node.position(TaskDrawer.actualPosition);
            layer.add(node);

            var line = <Konva.IGroup>TaskDrawer.taskTimeLineSample.clone({});
            var taskLine = <Konva.ILine>line.find('.TaskLine')[0];
            taskLine.points([
                0, 0,
                Utils.getCanvasWidth(), 0
            ]);
            line.position({x: 0, y: TaskDrawer.actualPosition.y});

            timeLineLayer.add(line);

            TaskDrawer.actualPosition.y += Utils.taskLineHeight;

            var that = this;
            this.taskGroup.on("dragend", function (evt) {
                that.dragged(evt);
            });
            //this.taskGroup.on("dragstart", function (evt) {
            //    TaskDrawer.taskDragged(<Konva.INode>evt.target)
            //});
            //this.taskGroup.on("dragend", function (evt) {
            //    TaskDrawer.taskDropped(<Konva.INode>evt.target);
            //});

        }

        createSamples() {
            this.createTaskNameSample();
            this.createTaskTimeLineSample();
        }


        createTaskNameSample() {
            TaskDrawer.taskNameSample = new Konva.Group({
                x: 0,
                y: 0
            });
            var taskName = new Konva.Text({
                name: 'TaskName',
                text: 'Sample task name',
                fontSize: Utils.taskLineHeight * 2 / 3,
                fontFamily: 'Roboto',
                fill: '#009688',
                y: Utils.taskLineHeight * 0.2
            });

            var line = new Konva.Line({
                name: 'TaskLine',
                stroke: 'grey',
                strokeWidth: 0.5,
                x: 0,
                y: 0,
                points: [
                    0, 0,
                    Utils.getCanvasWidth(), 0
                ]
            });

            TaskDrawer.taskNameSample.add(line);
            TaskDrawer.taskNameSample.add(taskName);

        }

        createTaskTimeLineSample() {
            TaskDrawer.taskTimeLineSample = new Konva.Group({
                x: 0,
                y: 0
            });
            var line = new Konva.Line({
                name: 'TaskLine',
                stroke: 'grey',
                strokeWidth: 0.5,
                x: 0,
                y: 0,
                points: [
                    0, 0,
                    Utils.getCanvasWidth(), 0
                ]
            });

            TaskDrawer.taskTimeLineSample.add(line);
        }

        dragged(evt: any) {
            this.task.earliestStartConstraint = Utils.positionToDate(evt.target.getAbsolutePosition().x);
            ProjectDrawer.refresh();
        }

        update(layer: Konva.ILayer): void {
            this.moveToDate(layer);
            this.animateWidth(layer);

        }

        moveToDate(layer: Konva.ILayer) {
            var slideToPosX = Utils.dateToPosition(this.task.start);
            var step = (slideToPosX - this.taskGroup.getAbsolutePosition().x) / 100;
            var forward = this.taskGroup.getAbsolutePosition().x < slideToPosX;
            var anim = new Konva.Animation(frame => {
                var position = this.taskGroup.getAbsolutePosition();
                this.taskGroup.setAbsolutePosition({x: position.x + frame.timeDiff * step, y: position.y})
                if ((forward && this.taskGroup.getAbsolutePosition().x > slideToPosX) || (!forward && this.taskGroup.getAbsolutePosition().x < slideToPosX)) {
                    anim.stop();
                    this.taskGroup.setAbsolutePosition({x: slideToPosX, y: position.y});
                }
            }, layer);
            anim.start();
        }

        animateWidth(layer: Konva.ILayer) {
            var node = <Konva.IRect>this.taskGroup.find('.durationRect')[0];
            var newWidth = Utils.dateToPosition(this.task.finish) - Utils.dateToPosition(this.task.start);
            var step = (newWidth - node.width()) / 100;
            var grow = node.getWidth() < newWidth;
            console.log("Width anim for " + this.task.name + ": old width: " + node.width() + ", new width: " + newWidth);
            var anim = new Konva.Animation(frame => {
                node.width(node.width() + frame.timeDiff * step);
                if ((grow && node.width() > newWidth) || (!grow && node.width() < newWidth)) {
                    anim.stop();
                    node.width(newWidth);
                }
            }, layer);
            anim.start();
        }


        public static taskDragged(node: Konva.INode) {
            node.blurRadius(10);
            node.scale({x: 1, y: 1.1});
            node.moveToTop()
        }

        public static taskDropped(node: Konva.INode) {
            node.blurRadius(10);
            node.scale({x: 1, y: 1.1});
        }
    }
}
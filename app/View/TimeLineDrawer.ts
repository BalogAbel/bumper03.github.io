///<reference path='../../lib/kineticjs.d.ts'/>
///<reference path='TaskDrawer.ts'/>
///<reference path='Utils.ts'/>

module View {
    import TaskDrawer =  View.TaskDrawer;
    import Utils =  View.Utils;

    export class TimeLineDrawer {
        private static sampleDay: Kinetic.IGroup = null;

        draw(layer: Kinetic.ILayer) {
            if(TimeLineDrawer.sampleDay == null) this.createSample();
            for(var i: number = 0; i < 20; i++) {
                var date: Date = new Date();
                date.setDate(date.getDate() + i);
                var node: Kinetic.IGroup = <Kinetic.IGroup>TimeLineDrawer.sampleDay.clone({});
                var dateText = <Kinetic.IText>node.find('.Date')[0];
                dateText.name("taskdate" + date.getTime());
                dateText.setText(date.getMonth()+1 + ". " + this.padding(date.getDate(), 2)+ ".");
                node.setPosition({x: Utils.dayWidth * i, y: node.getPosition().y});

                layer.add(node);
            }
        }

        private createSample() {
            TimeLineDrawer.sampleDay = new Kinetic.Group({
                x: 0,
                y: 0
            });

            var line1 = new Kinetic.Line({
                name: 'TaskLine',
                stroke: 'grey',
                dash: [1, 1],
                x: 0,
                y:0,
                points: [0, 0, 0, Utils.getCanvasHeight()-2]
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
        }

        private padding(num: number, padding: number): string {
            var n: string = num.toString();
            return n.length >= padding ? n : new Array(padding - n.length + 1).join('0') + n;

        }
    }
}
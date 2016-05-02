import {TaskDrawer} from "./TaskDrawer";
import {Utils} from "./Utils";
export class DependencyDrawer {
    // from: TaskDrawer;
    // to: TaskDrawer;

    constructor(public fromTask:TaskDrawer, public toTask:TaskDrawer) {

    }

    getArrow(): Konva.Arrow {
        var points: number[] = [];


        var from = {
            x: this.fromTask.taskGroup.position().x + this.fromTask.taskGroup.find('.durationRect')[0].width(),
            y: this.fromTask.taskGroup.position().y + Utils.taskLineHeight*0.5
        };
        var to = {
            x: this.toTask.taskGroup.position().x,
            y: this.toTask.taskGroup.position().y
        };

        points.push(from.x, from.y);

        var diff = Math.abs(from.x - to.x);
        if(diff != 0) {
            if (diff < 10) {
                points.push(to.x, from.y);
            } else {
                to.y += Utils.taskLineHeight*0.5;
                points.push(from.x + diff / 2, from.y);
                points.push(from.x + diff / 2, to.y)
            }
        }
        points.push(to.x, to.y);



        return new Konva.Arrow({
            x: 0,
            y: 0,
            points: points,
            pointerLength: 5,
            pointerWidth : 5,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 1
        })
    }

}
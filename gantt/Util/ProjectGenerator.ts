import {Project} from "../Model/Project";
import {ResourceType} from "../Model/Resources/ResourceType";
import {Task} from "../Model/Task";
import {Schedulable} from "../Model/Schedulable";
import {Duration} from "../Model/WorkingCalendar/Duration";
import {WorkingCalendar} from "../Model/WorkingCalendar/WorkingCalendar";
import {WorkingDay} from "../Model/WorkingCalendar/WorkingDay";
import {WorkingHour} from "../Model/WorkingCalendar/WorkingHour";
import {ResourceUsage} from "../Model/Resources/ResourceUsage";
import {Dependency} from "../Model/Dependency";
import {Summary} from "../Model/Summary";
import {SpecialDay} from "../Model/WorkingCalendar/SpecialDay";

export class ProjectGenerator {
    static idCtr:number = 0;
    
    static generateProject():Project {
        var resourceType = new ResourceType();
        resourceType.id = this.idCtr++;
        resourceType.available = 5;
        resourceType.name = "Senior developer";

        var resourceType2 = new ResourceType();
        resourceType2.id = this.idCtr++;
        resourceType2.available = 2;
        resourceType2.name = "Junior developer";


        var project:Project = new Project();
        var task11:Schedulable = new Schedulable();
        task11.name = 'Task1';
        task11.description = 'First task of phase 1';
        task11.duration = new Duration();
        task11.duration.day = 1;
        task11.duration.hour = 0;
        task11.duration.minute = 0;
        task11.id = this.idCtr++;
        var task12:Schedulable = new Schedulable();
        task12.name = 'Task2';
        task12.description = 'Second task of phase 1';
        task12.duration = new Duration();
        task12.duration.day = 0;
        task12.duration.hour = 10;
        task12.duration.minute = 0;
        task12.id = this.idCtr++;
        var dep12:Dependency = new Dependency();
        dep12.id = this.idCtr++;
        dep12.task = task11;
        task12.predecessors.push(dep12);
        var dep12re:Dependency = new Dependency();
        dep12re.id = this.idCtr++;
        dep12re.task = task12;
        task11.successors.push(dep12re);

        var phase1:Summary = new Summary();
        phase1.name = 'Phase 1';
        phase1.description = 'Summary of phase 1';
        phase1.id = this.idCtr++;
        phase1.tasks.push(task11);
        phase1.tasks.push(task12);
        task11.parent = phase1;
        task12.parent = phase1;
        var res1 = new ResourceUsage();
        res1.id = this.idCtr++;
        res1.resource = resourceType;
        res1.need = 2;
        phase1.resourceUsages.push(res1);


        var task21:Schedulable = new Schedulable();
        task21.name = 'Task3';
        task21.description = 'First task of phase 2';
        task21.duration = new Duration();
        task21.duration.day = 1;
        task21.duration.hour = 0;
        task21.duration.minute = 0;
        task21.id = this.idCtr++;
        var task22:Schedulable = new Schedulable();
        task22.name = 'Task4';
        task22.description = 'Second task of phase 2';
        task22.duration = new Duration();
        task22.duration.day = 0;
        task22.duration.hour = 20;
        task22.duration.minute = 0;
        task22.id = this.idCtr++;
        var dep22Duration = new Duration();
        dep22Duration.day = 1;
        var dep22:Dependency = new Dependency();
        dep22.task = task21;
        dep22.id = this.idCtr++;
        dep22.lag = dep22Duration;
        task22.predecessors.push(dep22);
        var dep22re:Dependency = new Dependency();
        dep22re.task = task22;
        dep22re.id = this.idCtr++;
        dep22re.lag = dep22Duration;
        task21.successors.push(dep22re);

        var phase2:Summary = new Summary();
        phase2.name = 'Phase 2';
        phase2.description = 'Summary of phase 2';
        phase2.id = this.idCtr++;
        var dep2:Dependency = new Dependency();
        dep2.id = this.idCtr++;
        dep2.task = phase1;
        phase2.predecessors.push(dep2);
        var dep2re:Dependency = new Dependency();
        dep2re.id = this.idCtr++;
        dep2re.task = phase2;
        phase1.successors.push(dep2re);
        var res2 = new ResourceUsage();
        res2.id = this.idCtr++;
        res2.resource = resourceType;
        res2.need = 1;
        phase2.resourceUsages.push(res2);

        phase2.tasks.push(task21);
        phase2.tasks.push(task22);
        phase2.id = this.idCtr++;
        task21.parent = phase2;
        task22.parent = phase2;

        var task3:Schedulable = new Schedulable();
        task3.name = 'Task5';
        task3.description = 'Independent task';
        task3.duration = new Duration();
        task3.duration.day = 0;
        task3.duration.hour = 20;
        task3.duration.minute = 0;
        task3.id = this.idCtr++;
        var res3 = new ResourceUsage();
        res3.id = this.idCtr++;
        res3.resource = resourceType;
        res3.need = 1;
        task3.resourceUsages.push(res3);

        project.tasks = [];
        project.tasks.push(phase1);
        project.tasks.push(phase2);
        project.tasks.push(task3);

        project.start = new Date();
        project.start.setHours(0, 0, 0, 0);


        var workingCalendar:WorkingCalendar = WorkingCalendar.getWorkingCalendar();
        var normalWorkingDay:WorkingDay = new WorkingDay();
        normalWorkingDay.workingHours.push(new WorkingHour(8, 0, 12, 0));
        normalWorkingDay.workingHours.push(new WorkingHour(12, 30, 16, 30));
        workingCalendar.normalWorkingDay = normalWorkingDay;
        var sday1 = new WorkingDay();
        sday1.workingHours.push(new WorkingHour(10, 0, 10, 10));
        workingCalendar.specialDays.add(new SpecialDay(new Date("2016.03.18"), sday1));

        project.workingCalendar = workingCalendar;
        project.resourceTypes.push(resourceType);
        project.resourceTypes.push(resourceType2);

        project.name = "Test project";
        return project;

    }
}
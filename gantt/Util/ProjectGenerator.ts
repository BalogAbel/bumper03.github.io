///<reference path='../../references.ts'/>

module Util {
	import Project = Model.Project;
	import Dependency = Model.Dependency;
	import Summary = Model.Summary;
	import Schedulable = Model.Schedulable;
	import Task = Model.Task;
	import Duration = Model.WorkingCalendar.Duration;
	import WorkingCalendar = Model.WorkingCalendar.WorkingCalendar;
	import WorkingHour = Model.WorkingCalendar.WorkingHour;
	import WorkingDay = Model.WorkingCalendar.WorkingDay;
	import ResourceType = Model.Resources.ResourceType;
	import ResourceUsage = Model.Resources.ResourceUsage;
	import LeastSlackTimeScheduler = Model.Schedulers.LeastSlackTimeScheduler;


	export class ProjectGenerator {
		static generateProject(): Project {
			var idCtr: number = 0;
			var resourceType = new ResourceType();
			resourceType.id = idCtr++;
			resourceType.available = 2;
			resourceType.name = "Senior developer";



			var project: Project = new Project();
			var task11: Schedulable = new Schedulable();
			task11.name = 'Task1';
			task11.description = 'First task of phase 1';
			task11.duration = new Duration();
			task11.duration.day = 1;
			task11.duration.hour = 0;
			task11.duration.minute = 0;
			task11.id = idCtr++;
			var task12: Schedulable = new Schedulable();
			task12.name = 'Task2';
			task12.description = 'Second task of phase 1';
			task12.duration = new Duration();
			task12.duration.day = 0;
			task12.duration.hour = 10;
			task12.duration.minute = 0;
			task12.id = idCtr++;
			var dep12: Dependency = new Dependency();
			dep12.id = idCtr++;
			dep12.task = task11;
			task12.predecessors.push(dep12);
			var dep12re: Dependency = new Dependency();
			dep12re.id = idCtr++;
			dep12re.task = task12;
			task11.successors.push(dep12re);

			var phase1: Summary = new Summary();
			phase1.name = 'Phase 1';
			phase1.description = 'Summary of phase 1';
			phase1.id = idCtr++;
			phase1.tasks.push(task11);
			phase1.tasks.push(task12);
			task11.parent = phase1;
			task12.parent = phase1;
			var res1 = new ResourceUsage();
			res1.id = idCtr++;
			res1.resource = resourceType;
			res1.need = 2;
			phase1.resourceUsages.push(res1);


			var task21: Schedulable = new Schedulable();
			task21.name = 'Task3';
			task21.description = 'First task of phase 2';
			task21.duration = new Duration();
			task21.duration.day = 0;
			task21.duration.hour = 0;
			task21.duration.minute = 10;
			task21.id = idCtr++;
			var task22: Schedulable = new Schedulable();
			task22.name = 'Task4';
			task22.description = 'Second task of phase 2';
			task22.duration = new Duration();
			task22.duration.day = 0;
			task22.duration.hour = 20;
			task22.duration.minute = 0;
			task22.id = idCtr++;
			var dep22Duration = new Duration();
			dep22Duration.day = 1;
			var dep22: Dependency = new Dependency();
			dep22.task = task21;
			dep22.id = idCtr++;
			dep22.lag = dep22Duration;
			task22.predecessors.push(dep22);
			var dep22re: Dependency = new Dependency();
			dep22re.task = task22;
			dep22re.id = idCtr++;
			dep22re.lag = dep22Duration;
			task21.successors.push(dep22re);

			var phase2: Summary = new Summary();
			phase2.name = 'Phase 2';
			phase2.description = 'Summary of phase 2';
			phase2.id = idCtr++;
			var dep2: Dependency = new Dependency();
			dep2.id = idCtr++;
			dep2.task = phase1;
			phase2.predecessors.push(dep2);
			var dep2re: Dependency = new Dependency();
			dep2re.id = idCtr++;
			dep2re.task = phase2;
			phase1.successors.push(dep2re);
			var res2 = new ResourceUsage();
			res2.id = idCtr++;
			res2.resource = resourceType;
			res2.need = 1;
			phase2.resourceUsages.push(res2);

			phase2.tasks.push(task21);
			phase2.tasks.push(task22);
			phase2.id = idCtr++;
			task21.parent = phase2;
			task22.parent = phase2;

			var task3: Schedulable = new Schedulable();
			task3.name = 'Task5';
			task3.description = 'Independent task';
			task3.duration = new Duration();
			task3.duration.day = 0;
			task3.duration.hour = 20;
			task3.duration.minute = 0;
			task3.id = idCtr++;
			var res3 = new ResourceUsage();
			res3.id = idCtr++;
			res3.resource = resourceType;
			res3.need = 1;
			task3.resourceUsages.push(res3);

			project.tasks = [];
			project.tasks.push(phase1);
			project.tasks.push(phase2);
			project.tasks.push(task3);

			project.start = new Date();
			project.start.setHours(0, 0, 0, 0);


			var workingCalendar: WorkingCalendar = WorkingCalendar.getWorkingCalendar();
			var normalWorkingDay: WorkingDay = new WorkingDay();
			normalWorkingDay.workingHours.push(new WorkingHour(8, 0, 12, 0));
			normalWorkingDay.workingHours.push(new WorkingHour(12, 30, 16, 30));
			workingCalendar.normalWorkingDay = normalWorkingDay;
			project.workingCalendar = workingCalendar;
            project.resourceTypes.push(resourceType);

			return project;

		}
	}
}
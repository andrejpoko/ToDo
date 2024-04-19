import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskDialogData } from '../shared/task-dialog/task-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ItemsListService {
  private tasksSubject = new BehaviorSubject<TaskDialogData[]>([]);
  private doneTasksSubject = new BehaviorSubject<TaskDialogData[]>([]);

  tasks$: Observable<TaskDialogData[]> = this.tasksSubject.asObservable();
  doneTasks$: Observable<TaskDialogData[]> =
    this.doneTasksSubject.asObservable();

  constructor() {
    this.loadInitialTasks();
  }

  private loadInitialTasks(): void {
    const initialTasks = [
      {
        name: 'Task 1',
        description:
          'Very looooong Task Description, Description, Description, Description, Description, Description, Description, Description, Description, Description, Description, Description, Description, Description, Description, Description',
        checked: false,
      },
      { name: 'Task 2', description: 'Description of Task 2', checked: false },
      { name: 'Task 3', description: 'Description of Task 3', checked: false },
    ];
    this.tasksSubject.next(initialTasks);
  }

  addTask(task: TaskDialogData): void {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([...currentTasks, task]);
  }

  editTask(index: number, data: TaskDialogData): void {
    const tasks = this.tasksSubject.value;
    tasks[index] = data;
    this.tasksSubject.next([...tasks]);
  }

  moveToDone(index: number): void {
    const currentTasks = this.tasksSubject.value;
    const task = currentTasks.splice(index, 1)[0];
    this.tasksSubject.next(currentTasks);
    this.doneTasksSubject.next([...this.doneTasksSubject.value, task]);
  }

  removeFromDone(index: number): void {
    const doneTasks = this.doneTasksSubject.value;
    const task = doneTasks.splice(index, 1)[0];
    this.doneTasksSubject.next(doneTasks);
    this.tasksSubject.next([...this.tasksSubject.value, task]);
  }
}

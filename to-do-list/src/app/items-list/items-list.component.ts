import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Item } from './item.model';
import { MatDialog } from '@angular/material/dialog';
import {
  TaskDialogComponent,
  TaskDialogData,
} from '../shared/task-dialog/task-dialog.component';

@Component({
  standalone: true,
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCommonModule,
    MatListModule,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
})
export class ItemsListComponent implements OnInit {
  @Input() isToDo: boolean = true;
  form: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.form = this.fb.group({
      tasks: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.addInitialTasks();
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '40vw',
      data: { name: '', description: '', header: 'Add New Task' },
    });

    dialogRef.afterClosed().subscribe((result: TaskDialogData) => {
      if (!result.name) {
        return;
      }
      this.addNewTask(result.name, result.description);
    });
  }

  editTask(i: number): void {
    const task = this.tasks.at(i).value;
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '40vw',
      data: {
        name: task?.name,
        description: task?.description,
        header: 'Edit Task',
      },
    });

    dialogRef.afterClosed().subscribe((result: TaskDialogData) => {
      if (!result.name) {
        return;
      }
      this.editExistingTask(result, i);
    });
  }

  private addInitialTasks(): void {
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

    const tasksFormArray = this.tasks;
    initialTasks.forEach((task) => {
      tasksFormArray.push(
        this.fb.group({
          name: [task.name, Validators.required],
          description: [task.description, Validators.required],
          checked: [task.checked],
        })
      );
    });
  }

  private addNewTask(name: string, desc: string): void {
    const taskForm = this.fb.group({
      name: [name, Validators.required],
      description: [desc, Validators.required],
    });
    this.tasks.push(taskForm);
  }

  private editExistingTask(data: TaskDialogData, index: number) {
    this.tasks.at(index).patchValue({
      name: data.name,
      description: data.description,
    });
  }

  moveToDone(taskIndex: number): void {
    this.tasks.removeAt(taskIndex);
  }

  get tasks(): FormArray {
    return this.form.get('tasks') as FormArray;
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCommonModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Observable, Subject, takeUntil } from 'rxjs';
import
  {
    TaskDialogComponent,
    TaskDialogData,
  } from '../shared/task-dialog/task-dialog.component';
import { ItemsListService } from './items-list.service';

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
export class ItemsListComponent implements OnInit, OnDestroy {
  @Input() isToDo: boolean = true;
  tasks: TaskDialogData[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private itemListService: ItemsListService,
    public dialog: MatDialog
  ) {}

  get listTasks$(): Observable<TaskDialogData[]> {
    return this.isToDo
      ? this.itemListService.tasks$
      : this.itemListService.doneTasks$;
  }

  ngOnInit(): void {
    if (this.isToDo) {
      this.itemListService.tasks$
        .pipe(takeUntil(this.destroy$))
        .subscribe((tasks) => {
          this.tasks = tasks;
        });
    }
  }

  addTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '40vw',
      data: { name: '', description: '', header: 'Add New Task' },
    });

    dialogRef.afterClosed().subscribe((res: TaskDialogData) => {
      if (res && res.name) {
        this.itemListService.addTask(res);
      }
    });
  }

  editTask(i: number): void {
    const task = this.tasks[i];
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '40vw',
      data: {
        name: task?.name,
        description: task?.description,
        header: 'Edit Task',
      },
    });

    dialogRef.afterClosed().subscribe((res: TaskDialogData) => {
      if (res && res.name) {
        this.itemListService.editTask(i, res);
      }
    });
  }

  moveToDone(index: number): void {
    this.itemListService.moveToDone(index);
  }

  removeFromDone(index: number): void {
    this.itemListService.removeFromDone(index);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

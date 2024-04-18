import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import
  {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
  } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
  ],
})
export class TaskDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}

export interface TaskDialogData {
  name: string;
  description: string;
  header?: string;
}

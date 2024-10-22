import { Component } from '@angular/core';
import { Task } from '../../types';
import { NgFor } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../services';
import { AddTaskComponent } from '../add-task/add-task.component';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskItemComponent, NgFor, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  deleteTask(task: Task) {
    if (task.id) {
      this.taskService.deleteTask(task.id).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => {
      this.tasks.push(task);
      this.loadTasks();
    });
  }
}

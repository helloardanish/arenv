import { Component } from '@angular/core';
import { TestingqueueService } from '../testingqueue.service';
import { NgFor, NgIf } from '@angular/common';
import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-testingqueue',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
  ],
  templateUrl: './testingqueue.component.html',
  styleUrl: './testingqueue.component.css'
})
export class TestingqueueComponent {
  workerName: string = '';

  constructor(public testingQueueService: TestingqueueService) {
    //this.testingQueueService.startTimer();
  }

  addWorker() {
    if (this.workerName.trim() !== '') {
      //this.testingQueueService.addWorker(this.workerName);
      this.workerName = '';
    }
  }

  finishTask() {
    //this.testingQueueService.markAsFinished();
  }

  headings = ['Name', 'Time Left', 'Work Status', 'Completed']

  

  workers: {
    name: string,
    timeLeft: number,
    workStatus: string,
    completed: boolean,
  }[] = [
    {
      name: 'A R Danish',
      timeLeft: 0,
      workStatus: 'Completed',
      completed: true,
    },
    {
      name: 'A R',
      timeLeft: 60,
      workStatus: 'Started',
      completed: false,
    },
    {
      name: 'A R Danish',
      timeLeft: 0,
      workStatus: 'Pending',
      completed: false,
    },
  ]


  test(index: number){
    console.log('Workers name: '+this.workers[index].name);
  }
}

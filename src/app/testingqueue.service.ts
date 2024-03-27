import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestingqueueService {
  workers: { name: string, timer: number, finished: boolean }[] = [];
  currentWorkerIndex = 0;

  constructor() { }
  /*

  addWorker(name: string) {
    this.workers.push({ name, timer: 0, finished: false });
  }

  startTimer() {
    setInterval(() => {
      if (this.workers.length > 0 && !this.workers[this.currentWorkerIndex].finished) {
        this.workers[this.currentWorkerIndex].timer++;
      }
    }, 1000);
  }

  markAsFinished() {
    if (this.workers.length > 0) {
      this.workers[this.currentWorkerIndex].finished = true;
      this.currentWorkerIndex++;
      if (this.currentWorkerIndex < this.workers.length) {
        this.workers[this.currentWorkerIndex].timer = 0;
        this.workers[this.currentWorkerIndex].finished = false;
      }
    }
  }
  */
}

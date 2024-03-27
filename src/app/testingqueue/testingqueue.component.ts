import { Component } from '@angular/core';
import { TestingqueueService } from '../testingqueue.service';
import { NgFor, NgIf } from '@angular/common';
import { Timestamp } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-testingqueue',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
  ],
  templateUrl: './testingqueue.component.html',
  styleUrl: './testingqueue.component.css'
})
export class TestingqueueComponent {
  workerName: string = '';
  name: string = '';
  selectedTimeOption: string = "select";
  userActive: boolean = false;
  timeRunningForUser: boolean = false;
  //testingUserStatus: boolean[] = [];

  testingUserStatus: boolean[] = [];

  constructor(public testingQueueService: TestingqueueService) {
    //this.testingQueueService.startTimer();
  }
  ngOnInit() {
    this.testingUserStatus = Array(1000).fill(false);
    this.testingUserStatus[0] = true;
  }

  addWorker() {
    if (this.workerName.trim() !== '') {
      //this.testingQueueService.addWorker(this.workerName);
      this.workerName = '';
    }
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
  ]


  testingCompleted(index: number){
    console.log('Testing completed for '+this.workers[index].name);

    this.testingUserStatus[index] = true;
    this.workers[index].workStatus = 'Completed';
    this.workers[index].completed = true;

    if((this.workers.length > index+1) && (this.testingUserStatus[index + 1] == false)){
      this.startAsyncTimeoutCall(index+1, this.workers[index+1].timeLeft);
    }
  }

  addUser(){
    console.log("Adding "+this.name+ "for time: "+this.selectedTimeOption);
    
    const selectedTime = this.getSelectedTime(this.selectedTimeOption);

    this.workers.push({name: this.name, timeLeft: selectedTime, workStatus: 'Pending', completed: false});

    /*
    let currActive = false;

    for(let i=0; i<this.workers.length; i++){
      if(this.testingUserStatus[i]){
        currActive = true;
        break;
      }
    }
    */

    if(!this.timeRunningForUser){
      this.startAsyncTimeoutCall(this.workers.length-1, selectedTime);
    }
    
    this.name = '';
    this.selectedTimeOption="select";
  }


  getSelectedTime(option: string): number{
    let number = 0;
    switch(this.selectedTimeOption){
      case "5min":
        number = 5
        break;
      case "10min":
        number = 10
        break;
      case "15min":
        number = 15
        break;
      case "30min":
        number = 30
        break;
      case "60min":
        number = 60
        break;
      case "4hour":
        number = 240
        break;
      case "6hour":
        number = 360
        break;
      default:
        number = -1
    }
    return number;
  }


  async startAsyncTimeoutCall(userIndex: number ,seconds: number) {
    
    /*
    for (let i = seconds * 60; i > 0; i--) {
      this.workers[userIndex].timeLeft = i;
      console.log('Time passed: '+i);
      await this.delay(1000); // Wait for 1 second
      if(this.testingUserStatus[userIndex]){
        console.log('Testing done!!');
        break;
      }
    }
    */

    this.timeRunningForUser = true;


    while(!this.testingUserStatus[userIndex]){
      this.workers[userIndex].timeLeft -= 1;
      await this.delay(1000); // Wait for 1 second
    }

    this.timeRunningForUser = false;

    if(this.workers[userIndex].timeLeft > 0){
      console.log('Wow, completed on time!');
    }else{
      console.log('Good, but you took a lot of time!');
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  test(index: number){
    console.log('Workers name: '+this.workers[index].name);
  }
}

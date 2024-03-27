import { Component, HostListener } from '@angular/core';
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
  testingUserName: string = '';
  name: string = '';
  testingDescriptionInput: string = '';


  selectedTimeOption: string = "select";
  userActive: boolean = false;
  timeRunningForUser: boolean = false;
  //disableTestingCompletedButton: boolean[] = [];

  disableTestingCompletedButton: boolean[] = [];

  constructor(public testingQueueService: TestingqueueService) {
    //this.testingQueueService.startTimer();
  }
  ngOnInit() {
    this.disableTestingCompletedButton = Array(1000).fill(true);
    //this.disableTestingCompletedButton[0] = true;

    /*
    window.onbeforeunload = () => {
      this.displayAlert();
      return this.confirmReload();
    };
    */


    window.addEventListener('beforeunload', (event) => {
      // Cancel the event as returning a string will not show a confirmation dialog in all browsers
      event.preventDefault();
      // Show an alert dialog
      this.displayAlert();
    });

  }

  headings = ['Name', 'Estimated Time', 'Time Left', 'Testing Description', 'Completed', 'TAT']

  

  workers: {
    name: string,
    estimatedTime: number,
    timeLeft: number,
    testingDescription: string,
    completed: boolean,
    tat: number,
  }[] = [
    {
      name: 'A R Danish',
      estimatedTime: 0,
      timeLeft: 0,
      testingDescription: 'Bug 1 to work',
      completed: true,
      tat: 0,
    },
  ]



  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    // Check if Ctrl+R (or Cmd+R on Mac) is pressed
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 82) {
        // Prevent default action (reloading the page)
        console.log('Prevented reload');
        event.preventDefault();
    }
  }


  confirmReload() {
    console.log('Reload prevent check');
    return 'Are you sure you want to reload?';
  }

  displayAlert() {
    window.alert('Attempting to reload the page.');
    //window.close();
  }
  

/*
  @HostListener('window:beforeunload', ['$event'])
  confirmReload(event: Event) {
    // Display a confirmation dialog
    const confirmationMessage = 'Are you sure you want to reload?';
    //(event as any).returnValue = confirmationMessage; // For older browsers
    return confirmationMessage; // For modern browsers
  }
  */


  testingCompleted(index: number){
    console.log('Testing completed for '+this.workers[index].name);

    this.disableTestingCompletedButton[index] = true;
    this.workers[index].completed = true;

    this.workers[index].tat = this.workers[index].estimatedTime - this.workers[index].timeLeft;

    this.timeRunningForUser = false;

    if((this.workers.length > index+1) && (this.workers[index + 1].completed == false)){
      this.disableTestingCompletedButton[index+1] = false;
      this.startAsyncTimeoutCall(index+1, this.workers[index+1].timeLeft);
    }
  }

  addTestingUser(){
    
    if((this.name != '') && (this.name.length > 2) && (this.testingDescriptionInput != '') && (this.testingDescriptionInput.length > 5) && (this.selectedTimeOption != "select")){

      console.log("Adding "+this.name+ "for time: "+this.selectedTimeOption);
      
      const selectedTime = this.getSelectedTime(this.selectedTimeOption)*60;

      this.workers.push({name: this.name, estimatedTime:selectedTime, timeLeft: selectedTime, testingDescription: this.testingDescriptionInput, completed: false, tat: 0});

      /*
      let currActive = false;

      for(let i=0; i<this.workers.length; i++){
        if(this.disableTestingCompletedButton[i]){
          currActive = true;
          break;
        }
      }
      */

      if(!this.timeRunningForUser){
        this.startAsyncTimeoutCall(this.workers.length-1, selectedTime);
        this.disableTestingCompletedButton[this.workers.length-1] = false;
      }
      
      this.name = '';
      this.testingDescriptionInput = '';
      this.selectedTimeOption="select";

    }else{
      console.log('Please enter correct details');
      // TODO - Add error message as required
    }

  }


  getSelectedTime(option: string): number{
    let number = 0;
    switch(this.selectedTimeOption){
      case "1min":
        number = 1
        break;
      case "2min":
        number = 2
        break;
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
      if(this.disableTestingCompletedButton[userIndex]){
        console.log('Testing done!!');
        break;
      }
    }
    */

    this.timeRunningForUser = true;

    while(!this.workers[userIndex].completed){
      this.workers[userIndex].timeLeft -= 1;
      await this.delay(1000); // Wait for 1 second
    }
    console.log('Stopped');


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

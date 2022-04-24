import { Component, OnInit } from '@angular/core'

import { Task } from './task'
import { TasksService } from './tasks.service'
import {  ElementRef, ViewChild } from '@angular/core';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  providers: [TasksService]
})
export class TasksComponent implements OnInit {
  tasks: Task[]
  editTask: Task;
  emailField: boolean;
  openMsg: boolean;
  val:any =""

  
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;



  constructor(private taskService: TasksService) {}

  downloadImage(email){
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      let obj = {value:canvas.toDataURL('image/png'), email:email}
      this.taskService.addTask2(obj).subscribe(obj => console.log('yes'))
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'marble-diagram.png';
      this.downloadLink.nativeElement.click();
    });
  }
  
  ngOnInit() {
    this.getTasks()
  }

  send(){
    this.emailField = true;
    this.openMsg = true;

  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks))
  }

  add(title: string): void {
    this.editTask = undefined
    title = title.trim()
    if (!title) {
      return
    }

    const newTask: Task = { title } as any
    this.taskService.addTask(newTask).subscribe(task => this.tasks.push(task))
  }
  add2(email: string, e): void {
    debugger
    
  
   
    
    email = email.trim()
    if (!email) {
      return
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {

      const newEmail: any = { email } as any
      console.log(newEmail)
      this.downloadImage(newEmail.email)
      // this.taskService.addTask2(newEmail)
      this.openMsg = true;
      
     
    } else {
      alert("You have entered an invalid email address!")
      this.openMsg = false;
    }
      
     
      

    this.val = email
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(h => h !== task)
    this.taskService.deleteTask(task._id).subscribe()
  }

  edit(task) {
    this.editTask = task
  }

  update() {
    if (this.editTask) {
      this.taskService.updateTask(this.editTask).subscribe(task => {
        const ix = task ? this.tasks.findIndex(h => h._id === task._id) : -1
        if (ix > -1) {
          this.tasks[ix] = task
        }
      })
      this.editTask = undefined
    }
  }

  
}
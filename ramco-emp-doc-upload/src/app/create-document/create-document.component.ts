import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { FileUploadService } from "../shared/file-upload.service";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.css']
})

export class CreateDocumentComponent implements OnInit {
  @ViewChild('tabset', {static: true}) tabset: TabsetComponent;
  @ViewChild('first', {static: true}) first: TabDirective;
  @ViewChild('second', {static: true}) second: TabDirective;
  disableSwitching: boolean;
  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  users = [];
  isUserAdded = false;

  tagItems = [
    {title: "Developer"},
    {title: "Designer"},
    {title: "Manager"},
    {title: "Human Resource"},
    {title: "Admin Executive"},
    {title: "Networking Engineer"},
    {title: "Quality Analyst"},
  ];

  selectedTagItems = [];
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public fileUploadService: FileUploadService
  ) {
    // Reactive Form
    this.form = this.fb.group({
      name: [''],
      tags: [''],
      avatar: [null]
    })
  }

  ngOnInit() { }

  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submitForm() {
    this.fileUploadService.addDocument(
      this.form.value.name,
      this.getTagItems(),
      this.form.value.avatar
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.percentDone = false;
          this.isUserAdded = true;    
          setTimeout(() => {
            this.isUserAdded = false;            
          }, 20000);
      }
    })
  }

  getTagItems = () => {
    let tagItems = [];
    let tagList: string;
    this.selectedTagItems.map(el => {
      tagItems.push(el['title']);
      tagList = tagItems.join(',');
    });
    return tagList;
  }

  confirmTabSwitch($event) {
    if (this.disableSwitching) {
      const confirm = window.confirm('Discard changes and switch tab?');
      if (confirm) {
        this.disableSwitching = false;
        this.second.active = true;
      }
    }
  }

}

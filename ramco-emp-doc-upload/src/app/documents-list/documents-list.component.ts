import { Component, OnInit } from '@angular/core';
import { FileUploadService } from "../shared/file-upload.service";

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})

export class DocumentsListComponent implements OnInit {

  Documents: any = [];

  settings = {
    actions: false,
    delete: {
      confirmDelete: true,

      deleteButtonContent: 'Delete data',
      saveButtonContent: 'save',
      cancelButtonContent: 'cancel'
    },
    columns: {
      _id: {
        title: 'Emp.ID',
      },
      name: {
        title: 'Emp.Name',
      },
      document: {
        title: 'Emp.Doc Name',
      },
      tags: {
        title: 'Emp.Tags',
      },
    },
  };

  constructor(public fileUploadService: FileUploadService) {
    this.getDocuments();
  }

  ngOnInit() { 
  }

  getDocuments() {
    this.fileUploadService.getDocuments().subscribe((res) => {
      this.Documents = res['documents'];
    })
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CreateDocumentComponent } from './create-document/create-document.component';
import { DocumentsListComponent } from './documents-list/documents-list.component';

import { TagInputModule } from 'ngx-chips';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CreateDocumentComponent,
    DocumentsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    HttpClientModule,
    TagInputModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    AppRoutingModule
  ],
  exports: [
    TagInputModule,
    TabsModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
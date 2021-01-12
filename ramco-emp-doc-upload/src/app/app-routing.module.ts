import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { DocumentsListComponent } from './documents-list/documents-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-document' },
  { path: 'add-document', component: CreateDocumentComponent },
  { path: 'users-list', component: DocumentsListComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

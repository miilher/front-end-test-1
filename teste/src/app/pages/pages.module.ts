import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { CategoriesComponent } from './categories/categories.component';
import { ModalComponent} from '../components/modal/modal.component';
import { LoadingComponent } from './../components/loading/loading.component';
import {  MatTableModule, MatInputModule,
          MatButtonModule , MatIconModule,
          MatDialogModule,  MatProgressSpinnerModule,
          MatCheckboxModule, MatPaginatorModule} from '@angular/material';
import { CategoriesDetailComponent } from './categories/categories-detail/categories-detail.component';
import { ListsComponent } from './lists/lists.component';
import { ListsDetailComponent } from './lists/lists-detail/lists-detail.component';
import { ItemsComponent } from './items/items.component';
import { ItemsDetailComponent } from './items/items-detail/items-detail.component';


@NgModule({
  declarations: [
    PagesComponent,
    CategoriesComponent,
    ModalComponent,
    LoadingComponent,
    CategoriesDetailComponent,
    ListsComponent,
    ListsDetailComponent,
    ItemsComponent,
    ItemsDetailComponent
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatPaginatorModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    PagesComponent,
    CategoriesComponent,
    ModalComponent,
    LoadingComponent
  ],
  entryComponents:[ModalComponent],
  providers: []
})
export class PagesModule { }

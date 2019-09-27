import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../app.material.module';
import { AgGridModule } from 'ag-grid-angular';

import { HeaderComponent } from './layout/header/header.component';
import { ResumeTableComponent } from './resume-table/resume-table.component';



@NgModule({
  imports: [CommonModule, AppMaterialModule, RouterModule, AgGridModule.withComponents([])],
  declarations: [HeaderComponent, ResumeTableComponent],
  exports: [HeaderComponent, ResumeTableComponent]
})
export class ComponentsModule {}

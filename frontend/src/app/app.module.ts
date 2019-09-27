import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppMaterialModule } from './app.material.module';
import { ComponentsModule } from './components/components.module';
import { AgGridModule } from 'ag-grid-angular';

import { PagesModule } from './pages/pages.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    HttpClientModule,
    PagesModule,
    ComponentsModule,
    PipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

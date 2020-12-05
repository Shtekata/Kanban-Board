import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { PastTaskModule } from '../past-task/past-task.module';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule, PastTaskModule, CoreModule],
  exports: [HomeComponent]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CoreModule } from '../core/core.module';
import { HomeRouterModule } from './home-routing.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, CoreModule, HomeRouterModule],
  exports: [HomeComponent]
})
export class HomeModule { }

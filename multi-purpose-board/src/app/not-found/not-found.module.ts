import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundRouterModule } from './not-found.routing.module';
import { NotFoundComponent } from './not-found.component';



@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, NotFoundRouterModule],
  exports: [NotFoundComponent]
})
export class NotFoundModule { }

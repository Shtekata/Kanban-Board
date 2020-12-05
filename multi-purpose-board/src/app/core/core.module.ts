import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const dataDeclExp = [HeaderComponent, FooterComponent];

@NgModule({
  declarations: dataDeclExp,
  imports: [CommonModule, RouterModule],
  providers: [AuthGuard],
  exports: dataDeclExp
})
export class CoreModule { }

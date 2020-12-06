import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { appInterceptorProvider } from './app.interceptor';
import { AuthService } from './auth.service';

const dataDeclExp = [HeaderComponent, FooterComponent];

@NgModule({
  declarations: dataDeclExp,
  imports: [CommonModule, RouterModule],
  providers: [AuthGuard, appInterceptorProvider, AuthService],
  exports: dataDeclExp
})
export class CoreModule { }

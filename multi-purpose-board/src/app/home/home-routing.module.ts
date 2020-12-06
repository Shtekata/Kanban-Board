import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        data: {
            title: 'HOME'
        }
    }
];
export const HomeRouterModule = RouterModule.forChild(routes);

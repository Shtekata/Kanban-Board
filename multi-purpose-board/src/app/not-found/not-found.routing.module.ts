import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: NotFoundComponent,
        data: {
            title: 'NOT FOUND'
        }
    }
];
export const NotFoundRouterModule = RouterModule.forChild(routes);

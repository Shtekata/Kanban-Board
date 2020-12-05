import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
    {
        path: 'task',
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'detail/:id',
                component: DetailComponent,
                data: {
                    title: 'TASK DETAIL'
                }
            }
        ]
    }
];
export const PastTaskRouterModule = RouterModule.forChild(routes);

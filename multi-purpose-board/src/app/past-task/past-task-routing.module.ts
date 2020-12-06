import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { PastTaskListComponent } from './past-task-list/past-task-list.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PastTaskListComponent,
        data: {
            title: 'PAST TASKS'
        }
    },
    {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
            title: 'TASK DETAIL'
        }
    }
];
export const PastTaskRouterModule = RouterModule.forChild(routes);

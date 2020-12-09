import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { KanbanBoardComponent } from './kanban-board/kanban-board/kanban-board.component';

const routes: Routes = [
    {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
               {
            path: '',
            pathMatch: 'full',
            component: KanbanBoardComponent
            },
                {
            path: 'user',
            canActivateChild: [AuthGuard],
            loadChildren: () => import('./user/user.module').then(x => x.UserModule)
            },
                {
            path: 'past-task',
            canActivateChild: [AuthGuard],
            loadChildren: () => import('./past-task/past-task.module').then(x => x.PastTaskModule)
            },
                {
            path: 'home',
            canActivateChild: [AuthGuard],
            loadChildren: () => import('./home/home.module').then(x => x.HomeModule)
            },
                {
            path: '**',
            loadChildren: () => import('./not-found/not-found.module').then(x => x.NotFoundModule)
            }

        ]
    }
];

export const AppRoutingModule = RouterModule.forRoot(routes);

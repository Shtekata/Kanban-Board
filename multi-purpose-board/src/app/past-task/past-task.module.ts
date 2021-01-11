import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { PastTaskListComponent } from './past-task-list/past-task-list.component';
import { PastTaskListItemComponent } from './past-task-list-item/past-task-list-item.component';
import { PastTaskService } from './past-task.service';
import { SharedModule } from '../shared/shared.module';
import { PastTaskRouterModule } from './past-task-routing.module';
import { CoreModule } from '../core/core.module';
import { PastTaskListEffects } from './+store/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './+store';

const dataDeclExp = [PastTaskListComponent, PastTaskListItemComponent];

@NgModule({
  declarations: [dataDeclExp, DetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    PastTaskRouterModule,
    EffectsModule.forFeature([PastTaskListEffects]),
    StoreModule.forFeature('pastTask', reducers)
  ],
  providers: [
    PastTaskService,
    PastTaskListEffects
  ],
  exports: [dataDeclExp]
})
export class PastTaskModule { }

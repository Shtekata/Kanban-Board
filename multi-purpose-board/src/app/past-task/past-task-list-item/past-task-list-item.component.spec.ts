import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTaskListItemComponent } from './past-task-list-item.component';

describe('PastTaskListItemComponent', () => {
  let component: PastTaskListItemComponent;
  let fixture: ComponentFixture<PastTaskListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastTaskListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTaskListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

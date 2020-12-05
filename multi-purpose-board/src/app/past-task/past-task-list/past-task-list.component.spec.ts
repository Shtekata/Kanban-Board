import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTaskListComponent } from './past-task-list.component';

describe('PastTaskListComponent', () => {
  let component: PastTaskListComponent;
  let fixture: ComponentFixture<PastTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

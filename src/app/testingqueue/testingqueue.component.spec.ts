import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingqueueComponent } from './testingqueue.component';

describe('TestingqueueComponent', () => {
  let component: TestingqueueComponent;
  let fixture: ComponentFixture<TestingqueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingqueueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestingqueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

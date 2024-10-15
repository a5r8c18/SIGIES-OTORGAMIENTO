import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludeEventComponent } from './include-event.component';

describe('IncludeEventComponent', () => {
  let component: IncludeEventComponent;
  let fixture: ComponentFixture<IncludeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncludeEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncludeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

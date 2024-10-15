import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludePreselectionComponent } from './include-preselection.component';

describe('IncludePreselectionComponent', () => {
  let component: IncludePreselectionComponent;
  let fixture: ComponentFixture<IncludePreselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncludePreselectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncludePreselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePreselectionComponent } from './remove-preselection.component';

describe('RemovePreselectionComponent', () => {
  let component: RemovePreselectionComponent;
  let fixture: ComponentFixture<RemovePreselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemovePreselectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemovePreselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

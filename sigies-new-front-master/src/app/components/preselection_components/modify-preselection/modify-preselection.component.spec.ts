import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPreselectionComponent } from './modify-preselection.component';

describe('ModifyPreselectionComponent', () => {
  let component: ModifyPreselectionComponent;
  let fixture: ComponentFixture<ModifyPreselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyPreselectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyPreselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

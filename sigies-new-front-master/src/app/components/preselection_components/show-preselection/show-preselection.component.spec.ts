import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPreselectionComponent } from './show-preselection.component';

describe('ShowPreselectionComponent', () => {
  let component: ShowPreselectionComponent;
  let fixture: ComponentFixture<ShowPreselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPreselectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowPreselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

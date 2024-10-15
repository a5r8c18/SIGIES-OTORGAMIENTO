import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveOfficialComponent } from './remove-official.component';

describe('RemoveOfficialComponent', () => {
  let component: RemoveOfficialComponent;
  let fixture: ComponentFixture<RemoveOfficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveOfficialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

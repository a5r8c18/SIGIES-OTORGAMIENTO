import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyOfficialComponent } from './modify-official.component';

describe('ModifyOfficialComponent', () => {
  let component: ModifyOfficialComponent;
  let fixture: ComponentFixture<ModifyOfficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyOfficialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

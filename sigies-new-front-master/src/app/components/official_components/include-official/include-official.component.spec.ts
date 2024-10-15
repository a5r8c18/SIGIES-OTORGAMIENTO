import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludeOfficialComponent } from './include-official.component';

describe('IncludeOfficialComponent', () => {
  let component: IncludeOfficialComponent;
  let fixture: ComponentFixture<IncludeOfficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncludeOfficialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncludeOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

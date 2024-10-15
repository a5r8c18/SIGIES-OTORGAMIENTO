import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOfficialComponent } from './show-official.component';

describe('ShowOfficialComponent', () => {
  let component: ShowOfficialComponent;
  let fixture: ComponentFixture<ShowOfficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowOfficialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

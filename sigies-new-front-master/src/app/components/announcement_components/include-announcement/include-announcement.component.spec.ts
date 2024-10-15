import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludeAnnouncementComponent } from './include-announcement.component';

describe('IncludeAnnouncementComponent', () => {
  let component: IncludeAnnouncementComponent;
  let fixture: ComponentFixture<IncludeAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncludeAnnouncementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncludeAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAnnouncementComponent } from './modify-announcement.component';

describe('ModifyAnnouncementComponent', () => {
  let component: ModifyAnnouncementComponent;
  let fixture: ComponentFixture<ModifyAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyAnnouncementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

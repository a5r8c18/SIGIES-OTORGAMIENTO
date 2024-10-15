import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAnnouncementComponent } from './remove-announcement.component';

describe('RemoveAnnouncementComponent', () => {
  let component: RemoveAnnouncementComponent;
  let fixture: ComponentFixture<RemoveAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveAnnouncementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

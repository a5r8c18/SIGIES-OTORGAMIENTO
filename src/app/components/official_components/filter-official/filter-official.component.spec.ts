import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOfficialComponent } from './filter-official.component';

describe('FilterOfficialComponent', () => {
  let component: FilterOfficialComponent;
  let fixture: ComponentFixture<FilterOfficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterOfficialComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

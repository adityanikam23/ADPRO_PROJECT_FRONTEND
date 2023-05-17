import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseordersComponent } from './releaseorders.component';

describe('ReleaseordersComponent', () => {
  let component: ReleaseordersComponent;
  let fixture: ComponentFixture<ReleaseordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleaseordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

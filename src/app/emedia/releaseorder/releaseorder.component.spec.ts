import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseorderComponent } from './releaseorder.component';

describe('ReleaseorderComponent', () => {
  let component: ReleaseorderComponent;
  let fixture: ComponentFixture<ReleaseorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleaseorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmediasComponent } from './pmedias.component';

describe('PmediasComponent', () => {
  let component: PmediasComponent;
  let fixture: ComponentFixture<PmediasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmediasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

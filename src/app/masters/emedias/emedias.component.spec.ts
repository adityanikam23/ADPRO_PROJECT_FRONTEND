import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmediasComponent } from './emedias.component';

describe('EmediasComponent', () => {
  let component: EmediasComponent;
  let fixture: ComponentFixture<EmediasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmediasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

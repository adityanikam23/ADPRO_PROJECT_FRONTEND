import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolemenumappingComponent } from './rolemenumapping.component';

describe('RolemenumappingComponent', () => {
  let component: RolemenumappingComponent;
  let fixture: ComponentFixture<RolemenumappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolemenumappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolemenumappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

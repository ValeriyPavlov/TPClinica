import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistComponent } from './specialist.component';

describe('SpecialistComponent', () => {
  let component: SpecialistComponent;
  let fixture: ComponentFixture<SpecialistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialistComponent]
    });
    fixture = TestBed.createComponent(SpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

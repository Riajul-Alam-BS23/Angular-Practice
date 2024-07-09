import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmulatedComponent } from './emulated.component';

describe('EmulatedComponent', () => {
  let component: EmulatedComponent;
  let fixture: ComponentFixture<EmulatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmulatedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmulatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

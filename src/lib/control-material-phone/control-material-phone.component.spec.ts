import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMaterialPhoneComponent } from './control-material-phone.component';

describe('ControlMaterialphoneComponent', () => {
  let component: ControlMaterialPhoneComponent;
  let fixture: ComponentFixture<ControlMaterialPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlMaterialPhoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlMaterialPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

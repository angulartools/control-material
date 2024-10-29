import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMaterialSelectComponent } from './control-material-select.component';

describe('ControlMaterialselectComponent', () => {
  let component: ControlMaterialSelectComponent;
  let fixture: ComponentFixture<ControlMaterialSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlMaterialSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlMaterialSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

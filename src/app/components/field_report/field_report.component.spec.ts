import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldReportComponent } from './field_report.component';

describe('FieldReportComponent', () => {
  let component: FieldReportComponent;
  let fixture: ComponentFixture<FieldReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

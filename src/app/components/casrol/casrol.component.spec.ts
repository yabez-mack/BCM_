import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasrolComponent } from './casrol.component';

describe('CasrolComponent', () => {
  let component: CasrolComponent;
  let fixture: ComponentFixture<CasrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasrolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

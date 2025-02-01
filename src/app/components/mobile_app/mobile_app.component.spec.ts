import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppComponent } from './mobile_app.component';

describe('MobileAppComponent', () => {
  let component: MobileAppComponent;
  let fixture: ComponentFixture<MobileAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryAppComponent } from './gallery.component';

describe('GalleryAppComponent', () => {
  let component: GalleryAppComponent;
  let fixture: ComponentFixture<GalleryAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

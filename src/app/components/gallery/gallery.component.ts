import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'ngx-cookie-service';
import lgZoom from 'lightgallery/plugins/zoom'; 
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { LightGallery } from 'lightgallery/lightgallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GalleryAppComponent implements OnInit, AfterViewInit {
  settings = {
    counter: false,
    plugins: [lgZoom],  // Adding Zoom plugin
  };

  private lightGallery!: LightGallery;
  
  images_list: any[] = [];

  // Event handler for before slide
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log('Before Slide', index, prevIndex);
  };

  // Callback for initializing the gallery instance
  onInit = (detail: any): void => {
    this.lightGallery = detail.instance;
    console.log('LightGallery initialized');
  };

  // Refresh gallery on view check if needed
  ngAfterViewInit(): void {
    if (this.lightGallery) {
      this.lightGallery.refresh();
    }
  }

  constructor(
    private _auth: AuthService,
    private service: CookieService
  ) {}

  ngOnInit(): void {
    this.get_gallery_images();
  }

  get_gallery_images(): void {
    const body = {
      token: this.service.get('token'),
    };
    this._auth.get_all_gallery_images(body).subscribe((res: any) => {
      if (res.status === 'success') {
        let sets = new Set();
        res.data.forEach((element: any) => {
          sets.add(element.gallery_id);
        });

        let array = Array.from(sets);
        let i = 0;
        array.forEach((elements: any) => {
          let datas = res.data.filter((a: any) => a.gallery_id == elements);
          this.images_list[i] = datas.map((item: any) => ({
            gallery_name: item.gallery_name || 'gallery',
            image_url: item.image_url || 'path/to/default-image.jpg',
            thumb_url: item.image_url || 'path/to/default-thumb.jpg',
            id: item.id || 'default-id',
          }));
          i++;
        });
      }
    });
  }
}

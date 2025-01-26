import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-casrol',
  templateUrl: './casrol.component.html',
  styleUrls: ['./casrol.component.css']
})
export class CasrolComponent implements OnInit, OnDestroy {
constructor(
    private _auth: AuthService,
    // private _fb: FormBuilder,
    // private route: Router,
    // private service: CookieService,
    // private cd: ChangeDetectorRef,
    // private _http: HttpClient,
    // private datepipe: DatePipe
  ) {
  }
  images : any[
  ]=[];
  currentIndex: number = 0;
  transformPosition: number = 0;
  autoScrollInterval: any;
  isHovered: boolean = false;

  ngOnInit(): void {
    this.images=[]
    let val=sessionStorage.getItem('casrol')
    if(!val){

      let body={}
      this._auth.dashboard_images(body).subscribe((res:any)=>{
        if(res.status='success'){
          this.images=res.data
          this.images=this.images.filter((a:any)=>a.status==1&&a.type==1)
          sessionStorage.setItem('casrol',JSON.stringify(this.images))
        }
      })
    }
    else{
      this.images=JSON.parse(val)
      let body={}
      setTimeout(() => {
        
        this._auth.dashboard_images(body).subscribe((res:any)=>{
          if(res.status='success'){
            this.images=res.data
            this.images=this.images.filter((a:any)=>a.status==1&&a.type==1)
            sessionStorage.setItem('casrol',JSON.stringify(this.images))
          }
        })
      },2000)
    }
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  // Start auto-scrolling the images
  startAutoScroll(): void {
    this.autoScrollInterval = setInterval(() => {
      if (!this.isHovered) {
        this.moveToNext();
      }
    }, 5000); // Change image every 3 seconds
  }

  // Pause auto-scroll when hovered
  pause(): void {
    this.isHovered = true;
    clearInterval(this.autoScrollInterval);
  }

  // Resume auto-scroll when the hover is removed
  resume(): void {
    this.isHovered = false;
    this.startAutoScroll();
  }

  // Move to the next image
  moveToNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateTransformPosition();
  }

  // Move to the previous image
  moveToPrevious(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateTransformPosition();
  }

  // Move to a specific image based on the indicator click
  moveToImage(index: number): void {
    this.currentIndex = index;
    this.updateTransformPosition();
  }

  // Update the translateX position to move the carousel
  updateTransformPosition(): void {
    // Make sure transformPosition is always a valid number
    if (!isNaN(this.currentIndex) && this.images.length > 0) {
      this.transformPosition = -this.currentIndex * 100;
    } else {
      console.error('Invalid currentIndex or images array is empty');
    }
  }
}
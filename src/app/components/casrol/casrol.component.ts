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

  startAutoScroll(): void {
    this.autoScrollInterval = setInterval(() => {
      if (!this.isHovered) {
        this.moveToNext();
      }
    }, 5000); 
  }

  pause(): void {
    this.isHovered = true;
    clearInterval(this.autoScrollInterval);
  }

  resume(): void {
    this.isHovered = false;
    this.startAutoScroll();
  }

  moveToNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateTransformPosition();
  }

  moveToPrevious(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateTransformPosition();
  }

  moveToImage(index: number): void {
    this.currentIndex = index;
    this.updateTransformPosition();
  }

  updateTransformPosition(): void {
    if (!isNaN(this.currentIndex) && this.images.length > 0) {
      this.transformPosition = -this.currentIndex * 100;
    } else {
    }
  }
}
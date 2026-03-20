import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-casrol',
  templateUrl: './casrol.component.html',
  styleUrls: ['./casrol.component.css']
})
export class CasrolComponent implements OnInit, OnDestroy {

  constructor(private _auth: AuthService) {}

  images: any[] = [];
  loopImages: any[] = [];

  currentIndex = 1;

  // Drag
  startX = 0;
  currentTranslate = 0;
  prevTranslate = 0;
  isDragging = false;

  // Auto scroll
  autoScrollInterval: any = null;
  isHovered = false;

  base_url: any = 'https://api.bcmmovement.in';

  ngOnInit(): void {
    let val = sessionStorage.getItem('casrol');

    if (!val) {
      this.loadImages();
    } else {
      this.images = JSON.parse(val);
      this.prepareLoop();
      setTimeout(() => this.loadImages(), 2000);
    }

    this.startAutoScroll();
  }

  // ---------------- API ----------------

  loadImages() {
    this._auth.dashboard_images({}).subscribe((res: any) => {
      if (res.status === 'success') {
        this.images = res.data.filter((a: any) => a.status == 1 && a.type == 1);
        sessionStorage.setItem('casrol', JSON.stringify(this.images));
        this.prepareLoop();
      }
    });
  }

  prepareLoop() {
    if (this.images.length > 0) {
      this.loopImages = [
        this.images[this.images.length - 1],
        ...this.images,
        this.images[0]
      ];

      setTimeout(() => this.setPositionByIndex(), 0);
    }
  }

  // ---------------- DRAG ----------------

  onDragStart(event: any) {
    this.isDragging = true;
    this.clearAutoScroll(); // 🔥 stop auto scroll

    this.startX = this.getPositionX(event);
    document.querySelector('.carousel-wrapper1')?.classList.add('no-transition');
  }

  onDragMove(event: any) {
    if (!this.isDragging) return;

    const currentX = this.getPositionX(event);
    const diff = currentX - this.startX;

    this.currentTranslate = this.prevTranslate + diff;
  }

  onDragEnd() {
    if (!this.isDragging) return;

    this.isDragging = false;
    document.querySelector('.carousel-wrapper1')?.classList.remove('no-transition');

    const movedBy = this.currentTranslate - this.prevTranslate;

    if (movedBy < -100) this.currentIndex++;
    if (movedBy > 100) this.currentIndex--;

    this.setPositionByIndex();

    // 🔥 restart auto scroll safely
    setTimeout(() => {
      if (!this.isHovered) this.startAutoScroll();
    }, 800);
  }

  getPositionX(event: any) {
    return event.type.includes('mouse')
      ? event.pageX
      : event.touches[0].clientX;
  }

  // ---------------- POSITION ----------------

  setPositionByIndex() {
  const wrapper = document.querySelector('.carousel-wrapper1') as HTMLElement;
  const width = document.querySelector('.carousel-container1')?.clientWidth || 1;

  // move normally
  this.currentTranslate = this.currentIndex * -width;
  this.prevTranslate = this.currentTranslate;

  // 🔥 pause auto scroll during animation
  this.clearAutoScroll();

  // ✅ HANDLE LOOP (AFTER animation completes)
  setTimeout(() => {

    // LAST → FIRST FIX
    if (this.currentIndex === this.images.length + 1) {
      wrapper.classList.add('no-transition'); // ❌ disable animation

      this.currentIndex = 1;
      this.currentTranslate = this.currentIndex * -width;
      this.prevTranslate = this.currentTranslate;

      // force DOM update
      wrapper.style.transform = `translateX(${this.currentTranslate}px)`;

      setTimeout(() => {
        wrapper.classList.remove('no-transition'); // ✅ enable again
      }, 50);
    }

    // FIRST → LAST FIX
    if (this.currentIndex === 0) {
      wrapper.classList.add('no-transition');

      this.currentIndex = this.images.length;
      this.currentTranslate = this.currentIndex * -width;
      this.prevTranslate = this.currentTranslate;

      wrapper.style.transform = `translateX(${this.currentTranslate}px)`;

      setTimeout(() => {
        wrapper.classList.remove('no-transition');
      }, 50);
    }

    // restart auto scroll
    if (!this.isHovered && !this.isDragging) {
      this.startAutoScroll();
    }

  }, 400); // match CSS transition time
}
  // ---------------- AUTO SCROLL ----------------

  startAutoScroll() {
    this.clearAutoScroll(); // 🔥 prevent stacking

    this.autoScrollInterval = setInterval(() => {
      if (!this.isHovered && !this.isDragging) {
        this.currentIndex++;
        this.setPositionByIndex();
      }
    }, 5000);
  }

  clearAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  pause() {
    this.isHovered = true;
    this.clearAutoScroll(); // 🔥 instant stop
  }

  resume() {
    this.isHovered = false;
    this.startAutoScroll(); // 🔥 clean restart
  }

  ngOnDestroy(): void {
    this.clearAutoScroll();
  }
}
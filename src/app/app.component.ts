import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'islandStatics';
  ishovered: boolean = false;
  scrolled: boolean = false;
  imgData = [
    '../assets/CarouselImg/c1.jpg',
    '../assets/CarouselImg/c2.jpg',
  ]

  showData = [
    '../assets/CarouselImg/c1.jpg',
    '../assets/CarouselImg/c2.jpg',
    '../assets/CarouselImg/c2.jpg',
    '../assets/CarouselImg/c1.jpg',
    '../assets/CarouselImg/c1.jpg',
    '../assets/CarouselImg/c2.jpg',
  ]
  images: any[] = [];
  animatedHeadingOffset: number = 0;
  fadeInInterval: any;
  @ViewChild('animatedHeading') animatedHeading!: ElementRef;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // 判断滚动位置，当滚动超过某个阈值时添加或移除 scrolled 类
    this.scrolled = window.scrollY > 0;
    this.DescriptionHead();

  }
  constructor() {
    this.images = this.showData.map(url => {
      return {
        url: url,
        alt: 'Image',
        title: 'Title',
        description: 'Description',
        ishovered: false,
        isZoomed: false
      };
    });
  }

  ngOnInit(): void {
    // 获取标题元素的偏移量
    this.animatedHeadingOffset = this.animatedHeading.nativeElement.offsetTop - window.innerHeight;
  }
  showOverlay() {
    this.ishovered = true;
  }

  hideOverlay() {
    this.ishovered = false;
  }
  DescriptionHead(): void {
    const heading = document.getElementById('description-head');
    if (!heading) return;
    const headingPosition = heading.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;
    // 当h1元素完全展示时
    if (headingPosition < screenHeight && headingPosition > 0) {
      heading.classList.add('cssanimation', 'typing')
    }
  }
  zoomIn(image: any) {
    image.isZoomed = true;
  }

  zoomOut(image: any) {
    image.isZoomed = false;
  }
  calculateWidth(img: HTMLImageElement): number {
    return img.width;
  }
}

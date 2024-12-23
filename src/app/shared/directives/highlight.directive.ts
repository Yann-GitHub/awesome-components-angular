import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true,
})
export class HighlightDirective implements AfterViewInit {
  @Input() color: string = 'yellow';

  constructor(private el: ElementRef, private renderer: Renderer2) {} // Renderer2 provides possibility to test the directive in a non-DOM environment

  // Lifecycle hook that is called after a directive's view has been fully initialized
  ngAfterViewInit() {
    this.setBackGroundColor(this.color);
  }

  setBackGroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

  // HostListener decorator that listens to the event of the host element
  @HostListener('mouseenter') onMouseEnter() {
    this.setBackGroundColor('lightgray');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBackGroundColor(this.color);
  }

  @HostListener('click') onClick() {
    this.color = 'red';
  }
}

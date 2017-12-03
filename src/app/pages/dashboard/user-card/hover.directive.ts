import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector:  '[ngxAppHover]'
})

export class HoverDirective {

  @HostBinding('class.hovered') isHovered = false;

  @HostListener('mouseenter') onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovered = false;
  }
}

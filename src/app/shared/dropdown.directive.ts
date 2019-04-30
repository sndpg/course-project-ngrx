import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
    console.log(this.elementRef.nativeElement);
  }

  @HostListener('document:click', ['$event', '$event.target'])
  onClickOutside(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);

    if (!clickedInside) {
      this.isOpen = false;
    }
  }
}

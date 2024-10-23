import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(event: any): void {
    const searchTerm = event.target.value;
    this.search.emit(searchTerm);
  }
}

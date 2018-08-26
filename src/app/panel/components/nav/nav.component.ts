import { Component, OnInit } from '@angular/core';
import { VerticalNavCases } from './menu';

const date1: Date = new Date(2015, 1, 1);
const date2: Date = new Date(2017, 4, 5);

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  title = 'app';

  collapsible = true;

  private _collapse = true;

  case2: any;

  constructor(public verticalNavCases: VerticalNavCases) {
    this.case2 = this.verticalNavCases.allNestedIconMenu.items;

  }


  ngOnInit() {

  }

  get collapse(): boolean {
    return this._collapse;
  }

  set collapse(value: boolean) {
    this._collapse = value;
  }

  toggleCollapsible(): void {
    this.collapsible = !this.collapsible;
  }

  toggleCollapse(): void {
    this.collapse = !this.collapse;
  }


}

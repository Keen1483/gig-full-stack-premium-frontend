import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  breakpoint: number;

  constructor() { }

  ngOnInit(): void {
    if (window.innerWidth <= 576) {
      this.breakpoint = 1;
    } else if (window.innerWidth <= 992) {
      this.breakpoint = 2;
    } else if (window.innerWidth <= 1200) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 4;
    }
  }

  onResize(event: any) {
    if (event.target.innerWidth <= 576) {
      this.breakpoint = 1;
    } else if (event.target.innerWidth <= 992) {
      this.breakpoint = 2;
    } else if (event.target.innerWidth <= 1200) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 4;
    }
  }

}

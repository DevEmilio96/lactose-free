import { Component } from '@angular/core';

@Component({
  selector: 'footer-es',
  templateUrl: 'footer-es.html'
})
export class FooterEsComponent {

  text: string;

  constructor() {
    console.log('Hello FooterEsComponent Component');
    this.text = 'Lactose Free - Enterprise 2018';
  }

}

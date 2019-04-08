import { Component } from '@angular/core';

/**
 * Generated class for the TabBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tab-bar',
  templateUrl: 'tab-bar.html'
})
export class TabBarComponent {

  text: string;

  constructor() {
    console.log('Hello TabBarComponent Component');
    this.text = 'Hello World';
  }

}

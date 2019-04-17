import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CercaPageComponent } from './cerca';

@NgModule({
  declarations: [
    CercaPageComponent,
  ],
  imports: [
    IonicPageModule.forChild(CercaPageComponent),
  ],
})
export class CercaPageModule {}

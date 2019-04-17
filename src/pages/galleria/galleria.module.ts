import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleriaPageComponent } from './galleria';

@NgModule({
  declarations: [
    GalleriaPageComponent,
  ],
  imports: [
    IonicPageModule.forChild(GalleriaPageComponent),
  ],
})
export class GalleriaPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipesPageComponent } from './recipes';

@NgModule({
  declarations: [
    RecipesPageComponent,
  ],
  imports: [
    IonicPageModule.forChild(RecipesPageComponent),
  ],
})
export class RecipesPageModule {}

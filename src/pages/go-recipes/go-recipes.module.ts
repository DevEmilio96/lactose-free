import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoRecipesPageComponent } from './go-recipes';

@NgModule({
  declarations: [
    GoRecipesPageComponent,
  ],
  imports: [
    IonicPageModule.forChild(GoRecipesPageComponent),
  ],
})
export class GoRecipesPageModule {}

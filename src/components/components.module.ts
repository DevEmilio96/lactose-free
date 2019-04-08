import { NgModule } from '@angular/core';
import { HeaderEsComponent } from './header-es/header-es';
import { FooterEsComponent } from './footer-es/footer-es';
import { TabBarComponent } from './tab-bar/tab-bar';
@NgModule({
	declarations: [HeaderEsComponent,
    FooterEsComponent,
    TabBarComponent],
	imports: [],
	exports: [HeaderEsComponent,
    FooterEsComponent,
    TabBarComponent]
})
export class ComponentsModule {}

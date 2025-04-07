import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UiLibLocationSelectComponent } from '@angular-monorepo/ui-lib-location-select';
import { LibLoaderComponent } from '@libs/util-lib-common/src/lib/components/loader.component'; // Importing LoaderComponent
import { LibLocationSelectCustomIconDirective } from '@libs/ui-lib-location-select/src/lib/ui-lib-location-select/ui-lib-location-select-custom-icon.directive';

@Component({
  selector: 'lib-app-home',
  imports: [
    CommonModule,
    IonicModule,
    UiLibLocationSelectComponent,
    LibLoaderComponent,
    LibLocationSelectCustomIconDirective,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePageComponent {
  loading = signal(false);

  constructor() {
    setTimeout(() => {
      this.loading.set(true);
    }, 2000);
  }
}

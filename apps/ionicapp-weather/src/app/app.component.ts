import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { languageSlice } from '@libs/util-lib-common/src/lib/store/weather/index';
import { languages } from '@shared/config/weather';
import { initializeApp } from './store';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  isDefaultLanguageSet = false;

  constructor(private translate: TranslateService, private store: Store) {
    this.store.dispatch(initializeApp());

    const langs = languages.map((lang) => lang.value);
    this.translate.addLangs(langs);

    this.store.select(languageSlice.selector).subscribe((language) => {
      if (language) {
        if (!this.isDefaultLanguageSet) {
          this.translate.setDefaultLang(language);
          this.isDefaultLanguageSet = true;
        }
        this.translate.use(language);
      }
    });
  }
}

import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { languageSlice } from '@libs/util-lib-common/src/lib/store/weather/index';
import { languages, translationDefault } from '@shared/config/weather';
import { initializeApp } from './store';

export const PRELOADED_LANGUAGE = 'preload'; // Do not bind to any code, bound to appDefaultLanguage and translationDefault from '@shared/config/weather'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  isDefaultLanguageSet = false;

  constructor(
    private translateService: TranslateService,
    private store: Store
  ) {
    this.store.dispatch(initializeApp());

    const langs = languages
      .map((lang) => lang.value)
      .concat(PRELOADED_LANGUAGE);

    // Preload one language for entire app. Other languages will be lazily loaded
    this.translateService.addLangs(langs);
    this.translateService.setTranslation(
      PRELOADED_LANGUAGE,
      translationDefault
    );
    this.translateService.use(PRELOADED_LANGUAGE);

    this.store.select(languageSlice.selector).subscribe((language) => {
      if (language) {
        if (!this.isDefaultLanguageSet) {
          this.isDefaultLanguageSet = true;
        }
        this.translateService.use(language);
        this.translateService.setDefaultLang(language);
      }
    });
  }
}

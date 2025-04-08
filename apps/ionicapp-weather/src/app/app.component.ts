import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { languageSlice } from '@libs/util-lib-common/src/lib/store/weather/index';
import {
  appDefaultLanguage,
  languages,
  translationDefault,
} from '@shared/config/weather';
import { initializeApp } from './store';
import { CustomTranslateLoader } from './core/translate-loader';
import { WeatherTranslationData } from '@shared/types/weather';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private translationCache = new Map<string, WeatherTranslationData>();

  constructor(
    private translateService: TranslateService,
    private store: Store
  ) {
    const langs = languages.map((lang) => lang.value);
    this.translateService.addLangs(langs);

    // Preload one language for entire app. Other languages will be lazily loaded
    this.translateService.setTranslation(
      appDefaultLanguage,
      translationDefault
    );
    this.translateService.setDefaultLang(appDefaultLanguage);
    this.translateService.use(appDefaultLanguage);

    this.store.dispatch(initializeApp());

    this.store.select(languageSlice.selector).subscribe((language) => {
      if (language) {
        if (this.translationCache.has(language)) {
          const cachedTranslations = this.translationCache.get(
            language
          ) as WeatherTranslationData;
          this.translateService.setTranslation(
            language,
            cachedTranslations,
            true
          );
          this.translateService.use(language);
        } else {
          this.translateService.setTranslation(language, {}, false); // Clear existing translations so CustomMissingTranslationHandler kicks in

          const loader = this.translateService
            .currentLoader as CustomTranslateLoader;

          if (loader instanceof CustomTranslateLoader) {
            loader.getTranslation(language).subscribe((translations) => {
              this.translationCache.set(language, translations);
              this.translateService.setTranslation(
                language,
                translations,
                true
              );
              this.translateService.use(language);
            });
          }
        }
      }
    });
  }
}

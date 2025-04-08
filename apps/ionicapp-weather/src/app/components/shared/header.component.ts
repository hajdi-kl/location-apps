import { Component, effect, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { UiLibLanguageSelectComponent } from '@angular-monorepo/ui-lib-language-select';
import { Store } from '@ngrx/store';
import { languageSlice } from '../../store';
import { languages } from '@shared/config/weather';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    RouterModule,
    UiLibLanguageSelectComponent,
  ],
})
export class HeaderComponent {
  currentLanguage = signal('');

  availableLanguages = languages;

  constructor(private store: Store) {
    // Initialize currentLanguage with the value from the store
    this.store
      .select(languageSlice.selector)
      .pipe(take(1)) // Take the initial value only
      .subscribe((language) => {
        if (language) {
          this.currentLanguage.set(language);
        }
      });

    // Effect to dispatch language changes to the store
    effect(() => {
      const newLanguage = this.currentLanguage();
      this.store.dispatch(
        languageSlice.set({ [languageSlice.prop]: newLanguage })
      );
    });
  }
}

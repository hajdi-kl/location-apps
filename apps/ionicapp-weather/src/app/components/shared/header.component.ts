import { Component, effect, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { UiLibLanguageSelectComponent } from '@angular-monorepo/ui-lib-language-select';
import { Store } from '@ngrx/store';
import { languageSlice } from '../../store';

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
  currentLanguage = signal('en');

  availableLanguages = [
    { name: 'English', value: 'en' },
    { name: 'Spanish', value: 'es' },
    { name: 'French', value: 'fr' },
  ];

  constructor(private store: Store) {
    effect(() => {
      const newLanguage = this.currentLanguage();
      this.store.dispatch(
        languageSlice.set({ [languageSlice.prop]: newLanguage })
      );
    });
  }
}

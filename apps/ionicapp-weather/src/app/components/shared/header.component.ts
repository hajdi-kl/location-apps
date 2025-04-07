import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { UiLibLanguageSelectComponent } from '@angular-monorepo/ui-lib-language-select';

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
  availableLanguages = [
    { name: 'English', value: 'en' },
    { name: 'Spanish', value: 'es' },
    { name: 'French', value: 'fr' },
  ];

  currentLanguage = 'en';
}

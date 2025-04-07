import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-select',
  imports: [CommonModule],
  templateUrl: './language-select.component.html',
  styleUrl: './language-select.component.scss',
})
export class LanguageSelectComponent {
  languages = ['en', 'sl'];
  selectedLanguage = 'en';

  switchLanguage(lang: string) {
    this.selectedLanguage = lang;
    console.log(`Language switched to: ${lang}`);
  }
}



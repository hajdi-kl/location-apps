import { Component, Input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, ActionSheetController } from '@ionic/angular/standalone';

@Component({
  selector: 'lib-ui-lib-language-select',
  imports: [CommonModule, IonButton],
  templateUrl: './ui-lib-language-select.component.html',
  styleUrl: './ui-lib-language-select.component.css',
})
export class UiLibLanguageSelectComponent {
  @Input() languages: { name: string; value: string }[] = [];
  selectedLanguage = model<string>('');

  constructor(private actionSheetCtrl: ActionSheetController) {}

  async openLanguageSelector(): Promise<void> {
    const buttons = this.languages.map((lang) => ({
      text: lang.name,
      handler: () => {
        this.selectedLanguage.set(lang.value);
      },
    }));

    buttons.push({
      text: 'Cancel',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      handler: () => {},
    });

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Language',
      buttons,
    });

    await actionSheet.present();
  }
}

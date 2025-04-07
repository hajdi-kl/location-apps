import { Component, Input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, ActionSheetController, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronUpOutline, chevronDownOutline } from 'ionicons/icons';

@Component({
  selector: 'lib-ui-lib-language-select',
  imports: [CommonModule, IonButton, IonIcon],
  templateUrl: './ui-lib-language-select.component.html',
  styleUrl: './ui-lib-language-select.component.css',
})
export class UiLibLanguageSelectComponent {
  @Input() languages: { name: string; value: string }[] = [];
  selectedLanguage = model<string>('');
  isActionSheetOpen = false;

  constructor(private actionSheetCtrl: ActionSheetController) {
    addIcons({ chevronUpOutline, chevronDownOutline });
  }

  async openLanguageSelector(): Promise<void> {
    this.isActionSheetOpen = true;

    const buttons = this.languages.map((lang) => ({
      text: lang.name,
      handler: () => {
        this.selectedLanguage.set(lang.value);
        this.isActionSheetOpen = false;
      },
    }));

    buttons.push({
      text: 'Cancel',
      handler: () => {
        this.isActionSheetOpen = false;
      },
    });

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Language',
      buttons,
    });

    actionSheet.onDidDismiss().then(() => {
      this.isActionSheetOpen = false;
    });

    await actionSheet.present();
  }
}

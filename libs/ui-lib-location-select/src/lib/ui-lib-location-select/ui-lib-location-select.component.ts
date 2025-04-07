import {
  Component,
  Input,
  ContentChild,
  AfterContentChecked,
  signal,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibLocationSelectCustomIconDirective } from '../ui-lib-location-select/ui-lib-location-select-custom-icon.directive';
import {
  ActionSheetController,
  ToastController,
  IonCard,
  IonIcon,
  IonCardContent,
} from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { removeCommentsFromString } from '@libs/util-lib-common/src/lib/utils/html';
import { LocationData, SelectOption } from '@shared/types/common';

export type Payload = LocationData | SelectOption;

@Component({
  selector: 'lib-ui-lib-location-select',
  imports: [CommonModule, IonCard, IonCardContent, IonIcon],
  templateUrl: './ui-lib-location-select.component.html',
  styleUrl: './ui-lib-location-select.component.css',
})
export class UiLibLocationSelectComponent implements AfterContentChecked {
  @Input() disabled = false;
  @Input() options: { name: string; value: string }[] = [];
  @Output() selectionChange = new EventEmitter<Payload>();

  isActionSheetOpen = false;
  hasCustomIcon = signal(false);

  @ContentChild(LibLocationSelectCustomIconDirective, { static: false })
  customIconDirective!: LibLocationSelectCustomIconDirective;

  constructor(
    private actionSheetController: ActionSheetController,
    private toastController: ToastController
  ) {}

  ngAfterContentChecked(): void {
    this.hasCustomIcon.set(
      !!removeCommentsFromString(
        this.customIconDirective.elementRef.nativeElement.innerHTML
      )
    );
  }

  async presentActionSheet() {
    if (this.disabled) return;

    this.isActionSheetOpen = true;
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose an option',
      buttons: [
        ...this.options.map((option) => ({
          text: option.name,
          handler: () => {
            this.selectionChange.emit(option);
          },
        })),
        {
          text: 'Set Latitude and Longitude',
          handler: async () => {
            try {
              const position = await Geolocation.getCurrentPosition(),
              payload = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              };
              this.selectionChange.emit(payload);
            } catch {
              this.showToast("Can't get location");
            }
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // No action needed for cancel button
          },
        },
      ],
    });

    actionSheet.onDidDismiss().then(() => {
      this.isActionSheetOpen = false;
    });

    await actionSheet.present();
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}

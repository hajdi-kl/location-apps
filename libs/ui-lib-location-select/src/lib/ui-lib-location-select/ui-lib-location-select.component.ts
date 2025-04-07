import {
  Component,
  Input,
  ContentChild,
  AfterContentChecked,
  signal,
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

@Component({
  selector: 'lib-ui-lib-location-select',
  imports: [CommonModule, IonCard, IonCardContent, IonIcon],
  templateUrl: './ui-lib-location-select.component.html',
  styleUrl: './ui-lib-location-select.component.css',
})
export class UiLibLocationSelectComponent implements AfterContentChecked {
  @Input() disabled = false;
  isActionSheetOpen = false;
  data: any = {};
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
    if (this.disabled) return; // Prevent action if disabled

    this.isActionSheetOpen = true; // Set action sheet state to open
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose an option',
      buttons: [
        {
          text: 'Set Query',
          handler: () => {
            this.data = { query: 'fixedQueryString' };
            console.log('Query set:', this.data);
          },
        },
        {
          text: 'Set Latitude and Longitude',
          handler: async () => {
            try {
              const position = await Geolocation.getCurrentPosition();
              this.data = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              };
              console.log('Lat Lon set:', this.data);

            } catch (error) {
              this.showToast("Can't get location");
            }
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Action cancelled');
          },
        },
      ],
    });

    actionSheet.onDidDismiss().then(() => {
      this.isActionSheetOpen = false; // Reset action sheet state
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

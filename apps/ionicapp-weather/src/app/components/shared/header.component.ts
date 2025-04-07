import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { LanguageSelectComponent } from './language-select.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, LanguageSelectComponent, RouterModule],
})
export class HeaderComponent {}

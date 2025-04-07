import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';
import {
  /* IonRouterLink, */ IonRouterOutlet,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-weather-index',
  imports: [IonRouterOutlet /* IonRouterLink, RouterModule */],
  templateUrl: './index.page.html',
  styleUrl: './index.page.scss',
})
export class IndexPageComponent {}

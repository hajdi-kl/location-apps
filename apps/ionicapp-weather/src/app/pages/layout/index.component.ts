import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/shared/header.component';
import { IonContent, IonRouterOutlet } from '@ionic/angular/standalone';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  standalone: true,
  imports: [HeaderComponent, IonContent, IonRouterOutlet],
})
export class IndexComponent {}

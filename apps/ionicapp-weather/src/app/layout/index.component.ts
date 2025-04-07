import { Component } from '@angular/core';
import { HeaderComponent } from '../components/shared/header.component';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  standalone: true,
  imports: [HeaderComponent, IonicModule],
})
export class IndexComponent {}

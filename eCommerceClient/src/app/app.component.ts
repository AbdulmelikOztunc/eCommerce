import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ToastModule, ButtonModule],
  template:`<p-toast position="bottom-right" [life]="3000" ></p-toast>
  <router-outlet></router-outlet>`
})
export class AppComponent {}

import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { LayoutComponent } from '../layout/layout.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginComponent } from '../../pages/login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,LayoutComponent,FooterComponent,SidebarComponent,RouterLink,LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

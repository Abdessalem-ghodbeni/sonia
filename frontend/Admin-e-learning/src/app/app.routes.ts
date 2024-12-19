import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ClasseComponent } from './pages/classe/classe.component';
import { Cour } from './modeles/cour';
import { CoursComponent } from './pages/cours/cours.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent, children: [
            { path: '', component: LayoutComponent },
            // { path: '', component: HeaderComponent },
            // { path: '', component: SidebarComponent },
            // { path: '', component: FooterComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: "contact", component: ContactComponent },
            { path: "classe", component: ClasseComponent },
            { path: "cours", component: CoursComponent }
            // {path:"notification",component:NotificationComponent}
        ]
    },
];

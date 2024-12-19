import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import path from 'node:path';

import { ClasseComponent } from './page/classe/classe.component';
import { ReclamationComponent } from './page/reclamation/reclamation.component';
import { CourComponent } from './page/cour/cour.component';

import { NoteComponent } from './page/note/note.component';
import { NotificationComponent } from './page/notification/notification.component';
import { PaiementComponent } from './page/paiement/paiement.component';
import { DetailcourComponent } from './page/detailcour/detailcour.component';
import { QuizQuestionComponent } from './page/quiz-question/quiz-question.component';
import { SupportcourComponent } from './page/supportcour/supportcour.component';
import { QuizSubmitComponent } from './page/quiz-response/quiz-response.component';
import { QuizformComponent } from './page/quizform/quizform.component';
import { QuiztestComponent } from './page/quiztest/quiztest.component';
import { DetailcourprofComponent } from './page/detailcourprof/detailcourprof.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: LayoutComponent },
      // { path: 'login', component: LoginComponent },

      { path: 'qform/:id', component: QuizformComponent },

      { path: 'test/:id', component: QuiztestComponent },

      { path: 'classe', component: ClasseComponent },

      { path: 'reclamation', component: ReclamationComponent },

      // etudiant & enseing

      { path: 'courses', component: CourComponent },
      //fil page he4i yetfar9ou wehd quiz w le5er support cours
      { path: 'detailcour/:id', component: DetailcourComponent },
      // {path:"detailcourprof/:id",component:DetailcourprofComponent},

      { path: 'supportcour', component: SupportcourComponent },

      // ens
      { path: 'quizquestion/:id', component: QuizQuestionComponent },
      // parent etudiant
      { path: 'paiement', component: PaiementComponent },
      // etuduant ensein wehd yaa3ti w le5r ychuf
      { path: 'note', component: NoteComponent },

      { path: 'notification', component: NotificationComponent },
      // ensig et etudiant
      { path: 'quiz-reponse', component: QuizSubmitComponent },
    ],
  },
];

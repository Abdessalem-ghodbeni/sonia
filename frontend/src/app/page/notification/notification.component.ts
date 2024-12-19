import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Notification } from '../../Modeles/notification';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notificationMessage: string = ''; //pour afficher le message d'erreur
  newNotification: Notification = new Notification()//pour créer une nouvelle notification
  recipientIds: number[] = [];//pour afficher le listes des notification
  formNotification: FormGroup //pour ajouter une nouvelle notification
  //wa9t ela yabda 3andek des input lazem ta5dem bl FormGroup 
  //chniya lfar9 bin FormsModule et ReactiveFormsModule => fl formsModule ta5dem bl ([ngModel])="newNoptification.notification" w ki ta5dem b ReactiveFormsMoule thot formControlName="notification"
  constructor(private notificationService: NotificationService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.formNotification = this.fb.group({
      notification: ['', Validators.required]
    })
  }

  createNotification(): void {
    if (this.notificationMessage && this.recipientIds.length > 0) {
      this.notificationService.addNotification(this.formNotification.value)
        .subscribe({
          next: (response) => alert('Notification envoyée avec succès'),
          error: (err) => console.error('Erreur lors de la création de la notification', err)
        });
      console.log("notification",this.formNotification.value);
    } else { 
      alert('Veuillez entrer un message et au moins un destinataire');
    }
  }
}

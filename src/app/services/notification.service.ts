import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // createNotification(notificationMessage: string, recipientIds: number[]) {
  //   throw new Error('Method not implemented.');
  // }

  constructor(private http:HttpClient) { }
  addNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${environment.baseurl}}/notification/create`, notification); 

  }
}

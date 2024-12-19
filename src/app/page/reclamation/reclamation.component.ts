import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ReclamationService } from '../../services/reclamation.service';
import emailjs from '@emailjs/browser';
import { ReclamationService } from '../../services/reclamation.service';
import { CommonModule } from '@angular/common';
import { Reclamation } from '../../Modeles/reclamation';



@Component({
  selector: 'app-reclamation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  reclamations: Reclamation[] = [];
  reclamationForm: FormGroup;     
  updateForm: FormGroup;
  tot: number;
  searchText: string;

  constructor(private fb: FormBuilder, private service: ReclamationService,) {

  }

  ngOnInit(): void {
    this.tot = this.reclamations.length;
    this.reclamationForm = this.fb.group({
      from_name: '',
      to_name: 'admin',
      from_email: '',
      subject: '',
      message: ''
    });

/*     this.updateForm = this.fb.group({
      id: ['', Validators.required],
      sujet: ['', Validators.required],
      description: ['', Validators.required]
    }); */
  }
  async send() {
    emailjs.init('x5FZa0KT47KGNPogU')
    let response = await emailjs.send('service_mwpg2qz', 'template_vlcln0g', {
      from_name: this.reclamationForm.value.from_name,
      to_name: this.reclamationForm.value.to_name,
      from_email: this.reclamationForm.value.from_email,
      subject: this.reclamationForm.value.subject,
      message: this.reclamationForm.value.message,
    });
    alert('message has been sent')
    this.reclamationForm.reset()
  }

  openAddModal(): void {
  }
  onExportPdf(): void {

  }
  search(): void {

  }
  editReclamation(reclamation: Reclamation): void {
  }

  deleteReclamation(id: number): void {
    this.reclamations = this.reclamations.filter(r => r.id !== id);
    this.showNotification('Réclamation supprimée avec succès!', 'danger');
  }

  addReclamation(): void {
    if (this.reclamationForm.valid) {
      const newReclamation: Reclamation = { ...this.reclamationForm.value, id: this.reclamations.length + 1 };
      this.reclamations.push(newReclamation);
      this.showNotification('Réclamation ajoutée avec succès!', 'success');
      this.reclamationForm.reset();
    }
  }

  updateReclamation(): void {
    if (this.updateForm.valid) {
      const updatedReclamation: Reclamation = this.updateForm.value;
      const index = this.reclamations.findIndex(r => r.id === updatedReclamation.id);
      if (index !== -1) {
        this.reclamations[index] = updatedReclamation;
        this.showNotification('Réclamation mise à jour avec succès!', 'success');
        this.updateForm.reset();
      }
    }
  }

  showNotification(message: string, type: string): void {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  }
}

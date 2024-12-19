import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest } from '../../modeles/authentication-request';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthserviceService } from '../../services/authservice.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  authRequest: AuthenticationRequest = new AuthenticationRequest();
  submitted = false;
  formLogin!: FormGroup // login
  errorMsg: string | null = null;
  loading = false
  constructor(private authService: AuthserviceService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  logins(): void {
    this.loading = true;
    this.errorMsg = null; 

    // Appel au service de connexion
    this.authService.login(this.formLogin.value).subscribe(
      (res: any) => {
        console.log('User sign in successful:', res);
        this.authService.setUserToken(res);
        this.loading = true
        Swal.fire({
          title: 'You have successfully logged in!',
          icon: 'success',
          confirmButtonText: 'Ok,got it!',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
        });
        this.router.navigate(['/register']);
      },
      (error) => {
        this.loading = false; // Désactivez le spinner
        if (error.status === 401) {
          this.errorMsg = 'Incorrect email or password';
        } else {
          this.errorMsg = 'An error occurred while logging in';
        }
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationRequest } from '../../Modeles/authentication-request';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RegisterRequest } from '../../Modeles/register-request';
import { Etudiant } from '../../Modeles/etudiant';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  authRequest: AuthenticationRequest = new AuthenticationRequest();
  registerRequest: RegisterRequest = new RegisterRequest();
  submitted = false;
  formLogin!: FormGroup // login
  formRegister!: FormGroup //register
  errorMsg: string = "";
  forgotPasswordForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  listRoles: any
  role:string
  filetoupload: ReadonlyArray<File> = []

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.formRegister = this.fb.group({
      nom: ['', Validators.required, Validators],
      email: ['', Validators.required],
      password: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      photo: ['', Validators.required],
      role: ['', Validators.required],
    });

    // Nouveau formulaire pour mot de passe oublié
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Nouveau formulaire pour réinitialisation du mot de passe
    this.resetPasswordForm = this.fb.group({
      token: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });


    // this.register()
    this.getUserByRole()
  }

  onForgotPassword(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      this.authService.forgotPassword(email).subscribe({
        next: () => Swal.fire('Succès !', 'Vérifiez votre email pour réinitialiser votre mot de passe.', 'success'),
        error: () => Swal.fire('Erreur !', 'Une erreur est survenue.', 'error')
      });
    }
  }

  onResetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const { token, newPassword } = this.resetPasswordForm.value;
      this.authService.resetPassword(token, newPassword).subscribe({
        next: () => Swal.fire('Succès !', 'Votre mot de passe a été réinitialisé avec succès.', 'success'),
        error: () => Swal.fire('Erreur !', 'Une erreur est survenue lors de la réinitialisation.', 'error')
      });
    }
  }

  handlefileinput(files: any) {   //fonction bech ta9ra l image
    this.filetoupload = <ReadonlyArray<File>>files.target.files
    console.log(this.filetoupload)
  }


  logins(): void {
    this.authService.login(this.authRequest).subscribe((res: any) => {
      
      console.log('User sign in successful:', res);
      this.role=res.role
      console.log("sonia",this.role)
      this.authService.setUserToken(res);
      localStorage.setItem('user', JSON.stringify(res));
      Swal.fire('Thank you...', 'You connected succesfully!', 'success')
      setTimeout(() => {
        location.reload();
      }, 1000);
      //  alert('connected')    
     // this.router.navigate(['/courses']);
     if (res.role == 'ENSEIGNANT') {
      this.router.navigateByUrl('/courses');
    } else if(res.role == 'PARENT') {
      this.router.navigateByUrl('/courses');
    }
  else{
    this.router.navigateByUrl('/courses');
  }
    },

      (error) => {
        if (error.status === 401) {
          this.errorMsg = ('Incorrect email or password');
        } else {
          this.errorMsg = 'An error occurred while logging in';
        }
      }
    );
  }


  createuser() {
    
    let formdata = new FormData()
    formdata.append("nom", this.formRegister.value.nom)
    formdata.append("prenom", this.formRegister.value.prenom)
    formdata.append("adresse", this.formRegister.value.adresse)
    formdata.append("telephone", this.formRegister.value.telephone)
    formdata.append("email", this.formRegister.value.email)
    formdata.append("password", this.formRegister.value.password)
    formdata.append("role", this.formRegister.value.role)
    formdata.append("photo", this.filetoupload[0]);
    console.log("formRegister", this.formRegister.value);
    this.authService.register(formdata).subscribe((resutl: any) => {
      console.log('User registered successfully');
      console.log('user registered successfully', resutl);
      Swal.fire('Succès ! Veuillez vérifier votre e-mail pour terminer votre inscription');
      this.router.navigate(['/']);
    },
      (error) => {
        if (error.status === 409) {
          this.errorMsg = ('Email already exists, please enter another email');
          // alert('Incorrect email or password')
        } else {
          this.errorMsg = 'An error occurred while logging in';
        }
      }
    );

  }
  getUserByRole(): void {
    this.authService.getAllRoles().subscribe((res: any) => {
      this.listRoles = res
      console.log("list of roles", this.listRoles);
    })
  }

}

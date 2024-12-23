import { Component, OnInit } from '@angular/core';
import { CourService } from '../../services/cour.service';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cour } from '../../Modeles/cour';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailcour',
  standalone: true,

  imports: [CommonModule, RouterModule],
  templateUrl: './detailcour.component.html',
  styleUrl: './detailcour.component.css',
})
export class DetailcourComponent implements OnInit {
  id = this.activatedroute.snapshot.params['id'];
  userconnect = JSON.parse(localStorage.getItem('access_token')!);
  user: any;
  state: boolean;

  // courId: Cour[] = [];
  courId: any;
  constructor(
    private courService: CourService,
    private activatedroute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!).role;
    console.log(this.user.role);
    console.log('mohamed', this.user);
    if (this.user == 'ETUDIANT') {
      this.state = true;
    }
    console.log(this.state);
    console.log('id', this.id);
    this.getCourById();
  }
  getCourById(): void {
    this.courService.getCourById(this.id).subscribe((res: any) => {
      this.courId = res;
      console.log('cours by id', this.courId);
    });
  }

  versQuizAssocieATest() {
    this._router.navigate(['/test/', this.id]);
  }
}

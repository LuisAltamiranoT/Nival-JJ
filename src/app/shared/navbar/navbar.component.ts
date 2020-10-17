import { Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../auth/login/login.component';

import { RegisterComponent } from 'src/app/auth/register/register.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  public user$: Observable<any> = this.authService.afAuth.user;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  openFormModalLogin() {
    const modalRef = this.modalService.open(LoginComponent, {
      windowClass: 'modal-holder',
      size: 'md',
      centered: true
    });
  }
  openFormModalRegister() {
    const modalRef = this.modalService.open(RegisterComponent, {
      windowClass: 'modal-holder',
      size: 'md',
      centered: true
    });
  }
  async logOut() {
    try {
      this.authService.logout();
      this.router.navigate(['/home']);
    } catch (error) {

    }
  }
}

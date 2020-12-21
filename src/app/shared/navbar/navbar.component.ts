import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/auth/login/login.component';

import { RegisterComponent } from 'src/app/auth/register/register.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

//permite remover el navbar de algunas direcciones y activar vista del componente
activar: boolean = false;
  

  public user$: Observable<any> = this.authService.afAuth.user;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    public location: Location
  ) { }

  ngOnInit() {
    this.remove();
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

  onActivate(event) {
    window.scroll(0, 0);
  }
  

  remove() {
    let title = this.location.prepareExternalUrl(this.location.path());
    title = title.slice(1).split("/")[0];
    if (title === "verification-email" || title === "password-forgot") {
      this.activar = true;
      return true;
    } else {
      this.activar = false;
      return false;
    }
  }

}

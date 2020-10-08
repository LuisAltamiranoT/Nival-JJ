import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../register/register.component';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validate=true;
  hide = true;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onLogin() {
    try {
      this.validate=false;
      const { email, password } = this.loginForm.value;
      const user = await this.authService.login(email, password);

      if(!user){
        this.validate=true;
      }

      if (user.emailVerified) {
        this.router.navigate(['/admin']);
        this.modalService.dismissAll();
        this.validate=true;
      } else if (user) {
        this.router.navigate(['/verification-email']);
        this.modalService.dismissAll();
        this.validate=true;
      }

    } catch (error) {

    }
  }

  /*modal*/

  dimissModalLogin() {
    this.activeModal.dismiss();
  }

  openFormModalRegister() {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(RegisterComponent, {
      windowClass: 'modal-holder',
      size: 'md',
      centered: true
    });
  }

  openReset(){
    this.dimissModalLogin();
    this.router.navigate(['/forgot-password']);
  }

  showError(mensaje: string) {
    this.toastr.success(mensaje, 'Error', {
      timeOut: 2000,
    });
  }
}

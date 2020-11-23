import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    _password: new FormControl(''),
  })

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onRegister() {
    try {
      const { email, password,nombre,apellido } = this.registerForm.value;
      const user = await this.authService.register(email, password,nombre,apellido);
      if (user) {
        this.modalService.dismissAll();
        this.router.navigate(['/verification-email']);
      }
    } catch (error) {
      this.authService.showError('Algo salio mal');
    }
  }

  //modal
  dimissModalRegister() {
    this.activeModal.dismiss();
  }

  openFormModalLogin() {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(LoginComponent, {
      windowClass: 'modal-holder',
      size: 'md',
      centered: true
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  userEmail = new FormControl('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onReset() {
    try {
      const email = this.userEmail.value;
      this.authService.resetPassword(email);
      window.alert('Se ha enviado el correo');
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }

}

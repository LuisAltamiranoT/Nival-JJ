import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  validacionPass: boolean = false;
  validate = true;
  mensaje = '';

  hide = true;
  hide1 = true;
  hide2 = true;

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  async onClick() {
    this.validate = false;
    const { oldPassword } = this.passwordForm.value;
    const dat = await this.authService.updateAcoountUser(oldPassword);
    if (dat != 1) {
      this.validate = true;
    } else {
      this.dimissModal();
    }
  }

  dimissModal() {
    this.dialogRef.close();
  }

  eraser() {
    this.passwordForm.patchValue({ office: "" });
  }
}

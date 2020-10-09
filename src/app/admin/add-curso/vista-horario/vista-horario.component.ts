import { Component, OnInit , Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-vista-horario',
  templateUrl: './vista-horario.component.html',
  styleUrls: ['./vista-horario.component.css']
})
export class VistaHorarioComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VistaHorarioComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}

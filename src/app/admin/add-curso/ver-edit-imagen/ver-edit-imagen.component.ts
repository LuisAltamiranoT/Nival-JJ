import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-edit-imagen',
  templateUrl: './ver-edit-imagen.component.html',
  styleUrls: ['./ver-edit-imagen.component.css']
})
export class VerEditImagenComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VerEditImagenComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any
  ) { }

  ngOnInit(): void {
    console.log(this.infoUser);
  }
}

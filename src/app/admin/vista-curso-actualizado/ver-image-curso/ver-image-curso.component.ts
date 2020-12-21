import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-image-curso',
  templateUrl: './ver-image-curso.component.html',
  styleUrls: ['./ver-image-curso.component.css']
})
export class VerImageCursoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VerImageCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any
  ) { }

  ngOnInit(): void {
    console.log(this.infoUser);
  }


}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup} from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  deleteForm = new FormGroup({
    password: new FormControl('')
  })

  constructor(
    public activeModal:NgbActiveModal,
    private modalService: NgbModal,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onDelete(){

  }
  dimissModal(){
    this.activeModal.dismiss();
  }

}

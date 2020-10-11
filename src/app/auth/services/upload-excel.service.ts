import { Injectable } from '@angular/core';
import { ExcelValidator } from '../helpers/excelValidator';
@Injectable({
  providedIn: 'root'
})
export class UploadExcelService extends ExcelValidator {

  constructor() {
    super();
  }
}

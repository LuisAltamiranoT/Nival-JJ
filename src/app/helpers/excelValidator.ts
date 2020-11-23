export class ExcelValidator {
    private acceptType = ['xlsx', 'xls'];
  
    validateType(fileType: string): boolean {
      return fileType === '' || fileType === undefined
        ? false
        : this.acceptType.includes(fileType);
    }
  }
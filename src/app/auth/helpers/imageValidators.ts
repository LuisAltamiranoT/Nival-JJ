//operador ternario
export class ImageValidator {
  private acceptType = ['image/jpeg', 'image/png'];

  validateType(fileType: string): boolean {
    return fileType === '' || fileType === undefined
      ? false
      : this.acceptType.includes(fileType);
  }

  validateSize(fileZise:number): boolean{
    return fileZise < 2000000 ? true : false
  }
}
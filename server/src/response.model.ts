export class ResponseModel<T> {
    public payload: T;
    public messages: string[];
  
    constructor(obj: T, msg?: string[]) {
      this.payload = obj;
      this.messages = [];
    }
  }
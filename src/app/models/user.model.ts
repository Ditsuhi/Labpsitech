export class MainUser {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public id?: number
  ) {}
}

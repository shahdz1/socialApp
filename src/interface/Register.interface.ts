export interface IRegister extends ILogin{
    name:string,
    username:string,
    rePassword:string,
    gender:string,
    dateOfBirth:string
}
export interface ILogin{
    email:string,
    password:string,
}

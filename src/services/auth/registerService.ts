import axios from "axios";
import { baseUrl} from "../../const/evn";
import type { IRegister} from "../../interface/Register.interface";

export async function sendData(data:IRegister){
    let response = await axios.post(`${baseUrl}/users/signup`, data)
    return response
}
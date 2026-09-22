import axios from "axios";
import { baseUrl} from "../../const/evn";
import type { ILogin } from "../../interface/register.interface";

export async function sendData(data:ILogin){
    let response = await axios.post(`${baseUrl}/users/signin`, data)
    return response
}
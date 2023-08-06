import axios from 'axios';
import { Message } from "@arco-design/web-react"
export const http = axios.create();
http.defaults.timeout = 25000;

export function HandlerAxiosErr(error: any) {
    if (error.response?.data?.Message) {
        Message.error(error.response.data.Message)
    } else {
        Message.error(error.message)
    }
}

export const HeaderSave = "x-st-save"
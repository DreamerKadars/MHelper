import { Message } from "@arco-design/web-react"

export function HandlerAxiosErr(error: any) { 
    if (error.response?.data?.Message) {
        Message.error(error.response.data.Message)
    } else {
        Message.error(error.message)
    }
}
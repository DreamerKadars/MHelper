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

export const PathMain: string = "/Main"
export const PathHeroData: string = "/HeroData"
export const PathLogin: string = "/Login"
export const PathAdmin: string = "/Admin"
export const PathHeroTemplateManage: string = PathAdmin+"/HeroTemplateManage"

export const PathHeroTemplateUpdate: string = PathAdmin + "/HeroTemplateUpdate"
export const PathIDParam: string = "/:id"
export const PathHeroTemplateCreate: string = PathAdmin + "/HeroTemplateCreate"